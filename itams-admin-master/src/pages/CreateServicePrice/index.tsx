import { Box } from "@mui/material";
import { useLocation } from "react-router-dom";
import CreateServicePriceForm from "./CreateServicePriceForm";
import PageHeader from "../../components/PageHeader";
import { Actions } from "../../interface/interface";

export default function CreateServicePrice(props: any) {
  const { action } = props;
  const { state } = useLocation();
  return (
    <Box>
      <PageHeader
        name={
          action === Actions.UPDATE
            ? "Service Price Update"
            : "Create Service Price"
        }
        canGoBack
      />
      <CreateServicePriceForm data={state} action={action} />
    </Box>
  );
}
