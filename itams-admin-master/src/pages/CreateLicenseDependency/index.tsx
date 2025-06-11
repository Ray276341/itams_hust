import { Box } from "@mui/material";
import CreateLicenseDependencyForm from "./CreateLicenseDependencyForm";
import { useLocation } from "react-router-dom";

import PageHeader from "../../components/PageHeader";
import { Actions } from "../../interface/interface";

function CreateLicenseDependency(props: any) {
  const { action } = props;
  const { state } = useLocation();
  return (
    <Box>
      <PageHeader
        name={
          action === Actions.UPDATE
            ? "License Dependency Update"
            : "Create License Dependency"
        }
        canGoBack
      />
      <CreateLicenseDependencyForm data={state} action={action} />
    </Box>
  );
}

export default CreateLicenseDependency;
