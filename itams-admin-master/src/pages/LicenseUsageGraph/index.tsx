import { Box } from "@mui/material";
import { useLocation } from "react-router-dom";
import LicenseUsageGraph from "./LicenseUsageGraph";
import PageHeader from "../../components/PageHeader";

function LicenseGraph(props: any) {
  const { action } = props;
  const { state } = useLocation();
  return <LicenseUsageGraph />;
}

export default LicenseGraph;
