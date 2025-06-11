import React from "react";
import { getAllInventories } from "../../api/inventory";
import { Inventory } from "../../interface/interface";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Box, Typography, CircularProgress } from "@mui/material";

type InventoryChartDatum = {
  dateLabel: string;
  totalAssets: number;
  totalLicenses: number;
  totalServices: number;
};

interface Props {
  departmentName: string;
}

export default function InventoryTrendChart({ departmentName }: Props) {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [chartData, setChartData] = React.useState<InventoryChartDatum[]>([]);

  React.useEffect(() => {
    async function fetchAll() {
      try {
        setIsLoading(true);
        const raw: Inventory[] = await getAllInventories();
        const filtered = raw.filter((inv) => inv.department === departmentName);

        if (filtered.length === 0) {
          setChartData([]);
          return;
        }

        const sorted = filtered.slice().sort((a, b) => {
          return (
            new Date(a.start_date).getTime() - new Date(b.start_date).getTime()
          );
        });

        const mapped: InventoryChartDatum[] = sorted.map((inv) => {
          const d = new Date(inv.start_date);
          const label = d.toISOString().slice(0, 10);
          return {
            dateLabel: label,
            totalAssets: inv.assets,
            totalLicenses: inv.licenses,
            totalServices: inv.services,
          };
        });

        setChartData(mapped);
      } catch (err) {
        console.error("Failed to fetch inventories for chart", err);
        setChartData([]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchAll();
  }, [departmentName]);

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 2 }}>
        <CircularProgress size={24} />
      </Box>
    );
  }

  if (!isLoading && chartData.length === 0) {
    return (
      <Typography variant="body2" align="center" sx={{ py: 2 }}>
        No inventory data for “{departmentName}”.
      </Typography>
    );
  }

  return (
    <Box sx={{ width: "100%", height: 300 }}>
      <Typography variant="h6" gutterBottom>
        Inventory Trend ({departmentName} – Number of Assets / Licenses /
        Services)
      </Typography>

      <ResponsiveContainer width="100%" height="85%">
        <LineChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="dateLabel" tick={{ fontSize: 12 }} />
          <YAxis />
          <Tooltip />
          <Legend verticalAlign="top" height={36} />

          <Line
            type="monotone"
            dataKey="totalAssets"
            name="Assets"
            stroke="#1f77b4"
            dot={{ r: 4 }}
          />
          <Line
            type="monotone"
            dataKey="totalLicenses"
            name="Licenses"
            stroke="#ff7f0e"
            dot={{ r: 4 }}
          />
          <Line
            type="monotone"
            dataKey="totalServices"
            name="Services"
            stroke="#2ca02c"
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
}
