import { Box } from "@mui/material";
import CreateRelationshipForm from "./CreateRelationshipForm";
import { useLocation } from "react-router-dom";

import PageHeader from "../../components/PageHeader";
import { Actions } from "../../interface/interface";

function CreateRelationship(props: any) {
  const { action } = props;
  const { state } = useLocation();
  return (
    <Box>
      <PageHeader
        name={
          action === Actions.UPDATE
            ? "Relationship Update"
            : "Create Relationship"
        }
        canGoBack
      />
      <CreateRelationshipForm data={state} action={action} />
    </Box>
  );
}

export default CreateRelationship;
