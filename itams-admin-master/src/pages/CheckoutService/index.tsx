import { Box } from "@mui/material";
import { useLocation } from "react-router-dom";
import CheckoutServiceForm from "./CheckoutServiceForm";
import PageHeader from "../../components/PageHeader";
import { Actions } from "../../interface/interface";

function CheckoutService(props: any) {
  const { action } = props;
  const { state } = useLocation();
  console.log(state, action);
  return (
    <Box>
      <PageHeader name="Checkout Service" canGoBack />
      <CheckoutServiceForm data={state} action={action} />
    </Box>
  );
}

export default CheckoutService;
