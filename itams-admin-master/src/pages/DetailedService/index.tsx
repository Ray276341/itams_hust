import * as React from "react";
import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useParams } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import ServiceInfo from "./ServiceInfo";
import ServiceToUserTable from "./ServiceToUserTable";
import ServiceHistoryTable from "./ServiceHistoryTable";
import ServicePriceTable from "./ServicePriceTable";
import ServiceDependencyTable from "./ServiceDependencyTable";
import ServiceUpdateTable from "./ServiceUpdateTable";
import ServiceUsageTable from "./ServiceUsageTable";

function DetailedService() {
  const { serviceId } = useParams();
  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <Box>
      <PageHeader name={`View service ${serviceId}`} canGoBack />
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              backgroundColor: "#FFF",
            }}
          >
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab
                label="Info"
                value="1"
                sx={{ textTransform: "capitalize" }}
              />
              <Tab
                label="Users"
                value="2"
                sx={{ textTransform: "capitalize" }}
              />
              <Tab
                label="History"
                value="3"
                sx={{ textTransform: "capitalize" }}
              />
              <Tab
                label="Price"
                value="4"
                sx={{ textTransform: "capitalize" }}
              />
              <Tab
                label="Dependency"
                value="5"
                sx={{ textTransform: "capitalize" }}
              />
              <Tab
                label="Update"
                value="6"
                sx={{ textTransform: "capitalize" }}
              />
              <Tab
                label="Usage"
                value="7"
                sx={{ textTransform: "capitalize" }}
              />
            </TabList>
          </Box>
          <TabPanel value="1" sx={{ padding: 0 }}>
            <ServiceInfo serviceId={Number(serviceId)} />
          </TabPanel>
          <TabPanel value="2" sx={{ padding: 0 }}>
            <ServiceToUserTable serviceId={Number(serviceId)} />
          </TabPanel>
          <TabPanel value="3" sx={{ padding: 0 }}>
            <ServiceHistoryTable
              serviceId={Number(serviceId)}
              withDeleted={true}
            />
          </TabPanel>
          <TabPanel value="4" sx={{ padding: 0 }}>
            <ServicePriceTable serviceId={Number(serviceId)} />
          </TabPanel>
          <TabPanel value="5" sx={{ padding: 0 }}>
            <ServiceDependencyTable serviceId={Number(serviceId)} />
          </TabPanel>
          <TabPanel value="6" sx={{ padding: 0 }}>
            <ServiceUpdateTable serviceId={Number(serviceId)} />
          </TabPanel>
          <TabPanel value="7" sx={{ padding: 0 }}>
            <ServiceUsageTable serviceId={Number(serviceId)} />
          </TabPanel>
        </TabContext>
      </Box>
    </Box>
  );
}

export default DetailedService;
