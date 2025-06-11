import * as React from "react";
import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useParams } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import SourceCodeInfo from "./SourceCodeInfo";
import SourceCodeToAssetTable from "./SourceCodeToUserTable";
import SourceCodeHistoryTable from "./SourceCodeHistoryTable";
import SourceCodeToDigitalContentTable from "./SourceCodeToDigitalContentTable";
import SourceCodeUpdateTable from "./SourceCodeUpdateTable";

function DetailedSourceCode() {
  const { sourceCodeId } = useParams();
  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <Box>
      <PageHeader name={`View SourceCode ${sourceCodeId}`} canGoBack />
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
                label="Digital Contents"
                value="3"
                sx={{ textTransform: "capitalize" }}
              />
              <Tab
                label="History"
                value="4"
                sx={{ textTransform: "capitalize" }}
              />
              <Tab
                label="Commit"
                value="5"
                sx={{ textTransform: "capitalize" }}
              />
            </TabList>
          </Box>
          <TabPanel value="1" sx={{ padding: 0 }}>
            <SourceCodeInfo sourceCodeId={Number(sourceCodeId)} />
          </TabPanel>
          <TabPanel value="2" sx={{ padding: 0 }}>
            <SourceCodeToAssetTable sourceCodeId={Number(sourceCodeId)} />
          </TabPanel>
          <TabPanel value="3" sx={{ padding: 0 }}>
            <SourceCodeToDigitalContentTable
              sourceCodeId={Number(sourceCodeId)}
            />
          </TabPanel>
          <TabPanel value="4" sx={{ padding: 0 }}>
            <SourceCodeHistoryTable
              sourceCodeId={Number(sourceCodeId)}
              withDeleted={true}
            />
          </TabPanel>
          <TabPanel value="5" sx={{ padding: 0 }}>
            <SourceCodeUpdateTable sourceCodeId={Number(sourceCodeId)} />
          </TabPanel>
        </TabContext>
      </Box>
    </Box>
  );
}

export default DetailedSourceCode;
