import { Box } from "@mui/material";
import CreateServiceUpdateForm from "./CreateServiceUpdateForm";
import { useLocation } from "react-router-dom";

import PageHeader from "../../components/PageHeader";
import { Actions } from "../../interface/interface";

function CreateServiceUpdate(props: any) {
  const { action } = props;
  const { state } = useLocation();
  return (
    <Box>
      <PageHeader
        name={
          action === Actions.UPDATE
            ? "Edit Service Update"
            : "Create Service Update"
        }
        canGoBack
      />
      <CreateServiceUpdateForm data={state} action={action} />
    </Box>
  );
}

export default CreateServiceUpdate;
