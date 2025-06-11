import { Box } from "@mui/material";
import CreateServiceUsageForm from "./CreateServiceUsageForm";
import { useLocation } from "react-router-dom";

import PageHeader from "../../components/PageHeader";
import { Actions } from "../../interface/interface";

function CreateServiceUsage(props: any) {
  const { action } = props;
  const { state } = useLocation();
  return (
    <Box>
      <PageHeader
        name={
          action === Actions.UPDATE
            ? "Edit Service Usage"
            : "Create Service Usage"
        }
        canGoBack
      />
      <CreateServiceUsageForm data={state} action={action} />
    </Box>
  );
}

export default CreateServiceUsage;
