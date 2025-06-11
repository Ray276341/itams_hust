import * as React from "react";
import {
  Box,
  Paper,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
  Grid,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { getAllServices } from "../../api/service";
import { getUsageByServiceId } from "../../api/serviceUsage";
import { Service, ServiceUsage } from "../../interface/interface";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";
dayjs.extend(weekOfYear);

const TIMEFRAMES = [
  { value: "7d", label: "Last 7 Days" },
  { value: "1m", label: "Last Month" },
  { value: "1y", label: "Last Year" },
  { value: "5y", label: "Last 5 Years" },
] as const;
type Timeframe = (typeof TIMEFRAMES)[number]["value"];

const COLORS = [
  "#1976d2",
  "#388e3c",
  "#f57c00",
  "#c2185b",
  "#00796b",
  "#512da8",
  "#d32f2f",
  "#455a64",
];

interface ChartPoint {
  bucket: string;
  [username: string]: number | string;
}

export default function ServiceUsageGraph() {
  const { serviceId: paramId } = useParams<{ serviceId: string }>();
  const defaultServiceId = Number(paramId);
  const navigate = useNavigate();

  const [allServices, setAllServices] = React.useState<Service[]>([]);
  const [selectedServices, setSelectedServices] = React.useState<number[]>([
    defaultServiceId,
  ]);
  const [usageMap, setUsageMap] = React.useState<
    Record<number, ServiceUsage[]>
  >({});
  const [metrics, setMetrics] = React.useState<string[]>([]);
  const [selectedMetrics, setSelectedMetrics] = React.useState<string[]>([]);
  const [timeframe, setTimeframe] = React.useState<Timeframe>("7d");
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    getAllServices()
      .then(setAllServices)
      .catch(() => console.error("Failed loading services"));
  }, []);

  React.useEffect(() => {
    if (!selectedServices.length) {
      setUsageMap({});
      setMetrics([]);
      setSelectedMetrics([]);
      return;
    }
    setLoading(true);
    Promise.all(
      selectedServices.map((sid) =>
        getUsageByServiceId(sid).then((list) => ({ sid, list }))
      )
    )
      .then((results) => {
        const map: Record<number, ServiceUsage[]> = {};
        results.forEach(({ sid, list }) => (map[sid] = list));
        setUsageMap(map);

        const ms = new Set<string>();
        Object.values(map).forEach((list) =>
          list.forEach((u) => ms.add(u.usage_metric))
        );
        const all = Array.from(ms);
        setMetrics(all);
        if (!selectedMetrics.length) setSelectedMetrics(all);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [selectedServices]);

  const handleServiceChange = (e: SelectChangeEvent<number[]>) =>
    setSelectedServices(e.target.value as number[]);
  const handleMetricChange = (e: SelectChangeEvent<string[]>) =>
    setSelectedMetrics(e.target.value as string[]);
  const handleTimeframeChange = (e: SelectChangeEvent<Timeframe>) =>
    setTimeframe(e.target.value as Timeframe);

  function buildChartData(svcId: number, metric: string): ChartPoint[] {
    const today = dayjs();
    let buckets: string[] = [];
    if (timeframe === "7d") {
      for (let i = 6; i >= 0; i--)
        buckets.push(today.subtract(i, "day").format("MM/DD"));
    } else if (timeframe === "1m") {
      const start = today.subtract(1, "month").startOf("week");
      for (let i = 0; i < 5; i++)
        buckets.push(`Wk ${start.add(i, "week").week()}`);
    } else if (timeframe === "1y") {
      for (let i = 11; i >= 0; i--)
        buckets.push(today.subtract(i, "month").format("MMM"));
    } else {
      for (let i = 4; i >= 0; i--)
        buckets.push(today.subtract(i, "year").format("YYYY"));
    }

    const data: ChartPoint[] = buckets.map((bucket) => ({ bucket }));
    const cutoff = (() => {
      switch (timeframe) {
        case "7d":
          return today.subtract(7, "day");
        case "1m":
          return today.subtract(1, "month");
        case "1y":
          return today.subtract(1, "year");
        case "5y":
          return today.subtract(5, "year");
      }
    })();

    (usageMap[svcId] || [])
      .filter(
        (u) => u.usage_metric === metric && dayjs(u.record_at).isAfter(cutoff)
      )
      .forEach((u) => {
        let label: string;
        if (timeframe === "7d") label = dayjs(u.record_at).format("MM/DD");
        else if (timeframe === "1m") label = `Wk ${dayjs(u.record_at).week()}`;
        else if (timeframe === "1y") label = dayjs(u.record_at).format("MMM");
        else label = dayjs(u.record_at).format("YYYY");

        const point = data.find((d) => d.bucket === label);
        if (!point) return;
        const key = u.user.username;
        point[key] = ((point[key] as number) || 0) + Number(u.usage_value);
      });

    return data;
  }

  const metricMax: Record<string, number> = {};
  selectedMetrics.forEach((metric) => {
    let maxVal = 0;
    selectedServices.forEach((svcId) => {
      const data = buildChartData(svcId, metric);
      data.forEach((pt) => {
        Object.entries(pt).forEach(([k, v]) => {
          if (k === "bucket") return;
          maxVal = Math.max(maxVal, Number(v));
        });
      });
    });
    metricMax[metric] = maxVal;
  });

  if (loading) {
    return (
      <Box textAlign="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box p={3} bgcolor="#f0f2f5" minHeight="100vh">
      <Paper sx={{ p: 3, backgroundColor: "#FFF" }}>
        <Typography variant="h5" gutterBottom>
          Service Usage Graphs
        </Typography>

        <Box display="flex" gap={2} flexWrap="wrap" mb={3}>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel id="svc-label">Services</InputLabel>
            <Select
              labelId="svc-label"
              id="svc-select"
              label="Services"
              multiple
              value={selectedServices}
              onChange={handleServiceChange}
              renderValue={(vals) =>
                allServices
                  .filter((s) => vals.includes(s.id))
                  .map((s) => s.name)
                  .join(", ")
              }
            >
              {allServices.map((s) => (
                <MenuItem key={s.id} value={s.id}>
                  {s.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel id="metric-label">Metrics</InputLabel>
            <Select
              labelId="metric-label"
              id="metric-select"
              label="Metrics"
              multiple
              value={selectedMetrics}
              onChange={handleMetricChange}
            >
              {metrics.map((m) => (
                <MenuItem key={m} value={m}>
                  {m}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel id="tf-label">Timeframe</InputLabel>
            <Select
              labelId="tf-label"
              id="tf-select"
              label="Timeframe"
              value={timeframe}
              onChange={handleTimeframeChange}
            >
              {TIMEFRAMES.map((o) => (
                <MenuItem key={o.value} value={o.value}>
                  {o.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Grid container spacing={4}>
          {selectedServices.map((svcId) => {
            const svcName =
              allServices.find((s) => s.id === svcId)?.name || `#${svcId}`;
            return (
              <Grid item xs={12} key={svcId}>
                <Typography variant="h6" gutterBottom>
                  {svcName}
                </Typography>
                <Grid container spacing={2}>
                  {selectedMetrics.map((metric, mIdx) => {
                    const data = buildChartData(svcId, metric);
                    const users = Array.from(
                      new Set(
                        data.flatMap((d) =>
                          Object.keys(d).filter((k) => k !== "bucket")
                        )
                      )
                    );
                    return (
                      <Grid item xs={12} md={6} lg={4} key={metric}>
                        <Typography align="center" gutterBottom>
                          {metric}
                        </Typography>
                        <ResponsiveContainer width="100%" height={240}>
                          <LineChart data={data}>
                            <XAxis dataKey="bucket" />
                            <YAxis domain={[0, metricMax[metric]]} />
                            <Tooltip />
                            <Legend />
                            {users.map((user, idx) => (
                              <Line
                                key={user}
                                type="monotone"
                                dataKey={user}
                                stroke={COLORS[idx % COLORS.length]}
                                connectNulls
                              />
                            ))}
                          </LineChart>
                        </ResponsiveContainer>
                      </Grid>
                    );
                  })}
                </Grid>
              </Grid>
            );
          })}
        </Grid>

        <Box mt={4}>
          <Button onClick={() => navigate(-1)}>Back</Button>
        </Box>
      </Paper>
    </Box>
  );
}
