import { Box } from "@mui/material";
import ServiceTable from "./ServiceTable";
import PageHeader from "../../components/PageHeader";

function MyServices() {
  return (
    <Box>
      <PageHeader name="All Services" noButton />
      <ServiceTable />
    </Box>
  );
}

export default MyServices;
