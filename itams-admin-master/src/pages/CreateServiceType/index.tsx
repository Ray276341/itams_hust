import { Box } from "@mui/material";
import CreateServiceTypeForm from "./CreateServiceTypeForm";
import { useLocation } from "react-router-dom";

import PageHeader from "../../components/PageHeader";
import { Actions } from "../../interface/interface";

function CreateServiceType(props: any) {
  const { action } = props;
  const { state } = useLocation();
  return (
    <Box>
      <PageHeader
        name={
          action === Actions.UPDATE
            ? "Service Type Update"
            : "Create Service Type"
        }
        canGoBack
      />
      <CreateServiceTypeForm data={state} action={action} />
    </Box>
  );
}

export default CreateServiceType;
