import * as React from "react";
import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useParams } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import LicenseInfo from "./LicenseInfo";
import LicenseToAssetTable from "./LicenseToAssetTable";
import LicenseHistoryTable from "./LicenseHistoryTable";
import LicenseDependencyTable from "./LicenseDependencyTable";
import LicenseUpdateTable from "./LicenseUpdateTable";
import LicenseUsageTable from "./LicenseUsageTable";

function DetailedLicense() {
  const { licenseId } = useParams();
  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <Box>
      <PageHeader name={`View license ${licenseId}`} canGoBack />
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
                label="Assets"
                value="2"
                sx={{ textTransform: "capitalize" }}
              />
              <Tab
                label="History"
                value="3"
                sx={{ textTransform: "capitalize" }}
              />
              <Tab
                label="Dependency"
                value="4"
                sx={{ textTransform: "capitalize" }}
              />
              <Tab
                label="Update"
                value="5"
                sx={{ textTransform: "capitalize" }}
              />
              <Tab
                label="Usage"
                value="6"
                sx={{ textTransform: "capitalize" }}
              />
            </TabList>
          </Box>
          <TabPanel value="1" sx={{ padding: 0 }}>
            <LicenseInfo licenseId={Number(licenseId)} />
          </TabPanel>
          <TabPanel value="2" sx={{ padding: 0 }}>
            <LicenseToAssetTable licenseId={Number(licenseId)} />
          </TabPanel>
          <TabPanel value="3" sx={{ padding: 0 }}>
            <LicenseHistoryTable
              licenseId={Number(licenseId)}
              withDeleted={true}
            />
          </TabPanel>
          <TabPanel value="4" sx={{ padding: 0 }}>
            <LicenseDependencyTable licenseId={Number(licenseId)} />
          </TabPanel>
          <TabPanel value="5" sx={{ padding: 0 }}>
            <LicenseUpdateTable licenseId={Number(licenseId)} />
          </TabPanel>
          <TabPanel value="6" sx={{ padding: 0 }}>
            <LicenseUsageTable licenseId={Number(licenseId)} />
          </TabPanel>
        </TabContext>
      </Box>
    </Box>
  );
}

export default DetailedLicense;
