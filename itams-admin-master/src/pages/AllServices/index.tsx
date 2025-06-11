import { Box } from "@mui/material";
import ServiceTable from "./ServiceTable";
import PageHeader from "../../components/PageHeader";

function AllServices() {
  return (
    <Box>
      <PageHeader name="Software Services" destination="/services/create" />
      <ServiceTable />
    </Box>
  );
}

export default AllServices;
