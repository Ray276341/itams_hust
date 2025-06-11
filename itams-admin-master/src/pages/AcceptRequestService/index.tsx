import { Box } from "@mui/material";
import { useLocation } from "react-router-dom";
import AcceptRequestForm from "./AcceptRequestServiceForm";
import PageHeader from "../../components/PageHeader";

function AcceptRequestService() {
  const { state } = useLocation();
  return (
    <Box>
      <PageHeader name="Accept Request" canGoBack />
      <AcceptRequestForm data={state} />
    </Box>
  );
}

export default AcceptRequestService;
