import { Box } from "@mui/material";
import { useLocation } from "react-router-dom";
import CreateServiceForm from "./CreateServiceForm";
import PageHeader from "../../components/PageHeader";
import { Actions } from "../../interface/interface";

function CreateService(props: any) {
  const { action } = props;
  const { state } = useLocation();
  return (
    <Box>
      <PageHeader
        name={action === Actions.UPDATE ? "Service Update" : "Create Service"}
        canGoBack
      />
      <CreateServiceForm data={state} action={action} />
    </Box>
  );
}

export default CreateService;
