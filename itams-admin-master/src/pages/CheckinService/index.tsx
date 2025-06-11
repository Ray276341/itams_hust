import { Box } from "@mui/material";
import { useLocation } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import { Actions } from "../../interface/interface";
import CheckinServiceForm from "./CheckinServiceForm";

function CheckinService(props: any) {
  const { action } = props;
  const { state } = useLocation();
  console.log(state, action);
  return (
    <Box>
      <PageHeader name="Checkin Service" canGoBack />
      <CheckinServiceForm data={state} action={action} />
    </Box>
  );
}

export default CheckinService;
