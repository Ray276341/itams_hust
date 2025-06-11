import { Box } from "@mui/material";
import CreateServiceDependencyForm from "./CreateServiceDependencyForm";
import { useLocation } from "react-router-dom";

import PageHeader from "../../components/PageHeader";
import { Actions } from "../../interface/interface";

function CreateServiceDependency(props: any) {
  const { action } = props;
  const { state } = useLocation();
  return (
    <Box>
      <PageHeader
        name={
          action === Actions.UPDATE
            ? "Service Dependency Update"
            : "Create Service Dependency"
        }
        canGoBack
      />
      <CreateServiceDependencyForm data={state} action={action} />
    </Box>
  );
}

export default CreateServiceDependency;
