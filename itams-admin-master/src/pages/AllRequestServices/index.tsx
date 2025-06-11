import { Box } from "@mui/material";
import RequestServiceTable from "./RequestServiceTable";
import PageHeader from "../../components/PageHeader";

function AllRequestServices() {
  return (
    <Box>
      <PageHeader name="All Requests" noButton />
      <RequestServiceTable />
    </Box>
  );
}

export default AllRequestServices;
