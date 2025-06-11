import { Box } from "@mui/material";
import CreateLicenseUpdateForm from "./CreateLicenseUpdateForm";
import { useLocation } from "react-router-dom";

import PageHeader from "../../components/PageHeader";
import { Actions } from "../../interface/interface";

function CreateLicenseUpdate(props: any) {
  const { action } = props;
  const { state } = useLocation();
  return (
    <Box>
      <PageHeader
        name={
          action === Actions.UPDATE
            ? "Edit License Update"
            : "Create License Update"
        }
        canGoBack
      />
      <CreateLicenseUpdateForm data={state} action={action} />
    </Box>
  );
}

export default CreateLicenseUpdate;
