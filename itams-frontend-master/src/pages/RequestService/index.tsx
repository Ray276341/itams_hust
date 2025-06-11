import { Box } from "@mui/material";
import PageHeader from "../../components/PageHeader";
import RequestServiceTable from "./RequestServiceTable";

function RequestService() {
  return (
    <Box>
      <PageHeader
        name="Services Requested"
        destination="/request-service/create"
      />
      <RequestServiceTable />
    </Box>
  );
}

export default RequestService;
