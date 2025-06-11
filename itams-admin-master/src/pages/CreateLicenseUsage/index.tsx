import { Box } from "@mui/material";
import CreateLicenseUsageForm from "./CreateLicenseUsageForm";
import { useLocation } from "react-router-dom";

import PageHeader from "../../components/PageHeader";
import { Actions } from "../../interface/interface";

function CreateLicenseUsage(props: any) {
  const { action } = props;
  const { state } = useLocation();
  return (
    <Box>
      <PageHeader
        name={
          action === Actions.UPDATE
            ? "Edit License Usage"
            : "Create License Usage"
        }
        canGoBack
      />
      <CreateLicenseUsageForm data={state} action={action} />
    </Box>
  );
}

export default CreateLicenseUsage;
