import { Box } from "@mui/material";
import { useLocation } from "react-router-dom";
import CreateRequestForm from "./CreateRequestServiceForm";
import PageHeader from "../../components/PageHeader";
import { Actions } from "../../interface/interface";

function CreateRequestService(props: any) {
  const { action } = props;
  const { state } = useLocation();
  console.log(state, action);
  return (
    <Box>
      <PageHeader
        name={action === Actions.UPDATE ? "Service Update" : "Create Request"}
        canGoBack
      />
      <CreateRequestForm data={state} action={action} />
    </Box>
  );
}

export default CreateRequestService;
