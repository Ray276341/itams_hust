import { Box } from "@mui/material";
import { useState, useEffect } from "react";
import { getAllAssets } from "../../api/asset";
import { getAllDigitalContents } from "../../api/digitalContent";
import { getAllLicenses } from "../../api/license";
import { getAllSourceCodes } from "../../api/sourceCode";
import { getAllStatuses } from "../../api/status";
import { getAllUsers } from "../../api/user";
import Analytic from "../../components/Analytic";
import PageHeader from "../../components/PageHeader";
import {
  Asset,
  SourceCode,
  DigitalContent,
  License,
  User,
  Status,
  Service,
} from "../../interface/interface";
import DepartmentTable from "./DepartmentTable";
import PieChart from "./PieChart";
import { getAllServices } from "../../api/service";

function Dashboard() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [sourceCodes, setSourceCodes] = useState<SourceCode[]>([]);
  const [digitalContents, setDigitalContents] = useState<DigitalContent[]>([]);
  const [licenses, setLicenses] = useState<License[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [statuses, setStatuses] = useState<Status[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const getData = async () => {
    setIsLoading(true);
    try {
      const assets = await getAllAssets();
      const sourceCodes = await getAllSourceCodes();
      const digitalContents = await getAllDigitalContents();
      const licenses = await getAllLicenses();
      const services = await getAllServices();
      const users = await getAllUsers();
      const statuses = await getAllStatuses();
      setAssets(assets);
      setSourceCodes(sourceCodes);
      setDigitalContents(digitalContents);
      setLicenses(licenses);
      setServices(services);
      setUsers(users);
      setStatuses(statuses);
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <Box>
      <PageHeader name="Dashboard" noButton />
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: "center",
          gap: "24px",
          marginBottom: "24px",
        }}
      >
        <Analytic
          type="asset"
          quantity={assets.length}
          destination="/hardware"
        />
        <Analytic
          type="source code"
          quantity={sourceCodes.length}
          destination="/source-code"
        />
        <Analytic
          type="digital content"
          quantity={digitalContents.length}
          destination="/digital-content"
        />
        <Analytic
          type="license"
          quantity={licenses.length}
          destination="/licenses"
        />
        <Analytic
          type="service"
          quantity={services.length}
          destination="/services"
        />
        <Analytic type="user" quantity={users.length} destination="/users" />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: "start",
          gap: "24px",
        }}
      >
        <DepartmentTable />
        {!isLoading && (
          <PieChart
            data={statuses.map((status: Status) => {
              return { country: status.name, area: status.numOfAssets };
            })}
          />
        )}
      </Box>
    </Box>
  );
}

export default Dashboard;
