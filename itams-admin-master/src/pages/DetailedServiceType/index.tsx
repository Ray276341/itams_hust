import * as React from "react";
import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useParams } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import ServiceTable from "../AllServices/ServiceTable";
import ServiceTypeInfo from "./ServiceTypeInfo";

function DetailedServiceType() {
  const { serviceTypeId } = useParams();
  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <Box>
      <PageHeader name={`View Service Type ${serviceTypeId}`} canGoBack />
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
                label="Services"
                value="2"
                sx={{ textTransform: "capitalize" }}
              />
            </TabList>
          </Box>
          <TabPanel value="1" sx={{ padding: 0 }}>
            <ServiceTypeInfo serviceTypeId={Number(serviceTypeId)} />
          </TabPanel>
          <TabPanel value="2" sx={{ padding: 0 }}>
            <ServiceTable serviceTypeId={Number(serviceTypeId)} />
          </TabPanel>
        </TabContext>
      </Box>
    </Box>
  );
}

export default DetailedServiceType;
