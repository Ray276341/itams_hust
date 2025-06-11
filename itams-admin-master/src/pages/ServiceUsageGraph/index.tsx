import { Box } from "@mui/material";
import { useLocation } from "react-router-dom";
import ServiceUsageGraph from "./ServiceUsageGraph";
import PageHeader from "../../components/PageHeader";

function ServiceGraph(props: any) {
  const { action } = props;
  const { state } = useLocation();
  return <ServiceUsageGraph />;
}

export default ServiceGraph;
