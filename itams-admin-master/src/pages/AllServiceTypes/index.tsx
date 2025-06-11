import { Box } from "@mui/material";
import ServiceTypeTable from "./ServiceTypeTable";
import PageHeader from "../../components/PageHeader";

function AllServiceTypes() {
  return (
    <Box>
      <PageHeader name="All Service Types" destination="/serviceTypes/create" />
      <ServiceTypeTable />
    </Box>
  );
}

export default AllServiceTypes;
