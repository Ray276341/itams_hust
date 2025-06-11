import React from "react";
import {
  Box,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  SelectChangeEvent,
} from "@mui/material";
import PageHeader from "../../components/PageHeader";
import CategoryTable from "./InventoryTable";
import InventoryTrendChart from "./InventoryTrendChart";

import { getAllDepartments } from "../../api/department";
import { Department } from "../../interface/interface";

export default function AllInventories() {
  const [departments, setDepartments] = React.useState<Department[]>([]);
  const [selectedDept, setSelectedDept] = React.useState<string>("");

  React.useEffect(() => {
    async function fetchDepts() {
      try {
        const data: Department[] = await getAllDepartments();
        setDepartments(data);
        if (data.length > 0) {
          setSelectedDept(data[0].name);
        }
      } catch (err) {
        console.error("Failed to fetch departments", err);
      }
    }
    fetchDepts();
  }, []);

  const handleDeptChange = (event: SelectChangeEvent<string>) => {
    setSelectedDept(event.target.value as string);
  };

  return (
    <Box sx={{ p: 2 }}>
      <PageHeader name="All Inventories" destination="/inventory/create" />

      <Box sx={{ mt: 2, mb: 3, maxWidth: 300 }}>
        <FormControl fullWidth size="small">
          <InputLabel id="select-dept-label">Department</InputLabel>
          <Select
            labelId="select-dept-label"
            value={selectedDept}
            label="Department"
            onChange={handleDeptChange}
          >
            {departments.map((dept) => (
              <MenuItem key={dept.id} value={dept.name}>
                {dept.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Paper
        elevation={2}
        sx={{
          p: 2,
          mb: 4,
          backgroundColor: "common.white",
        }}
      >
        <InventoryTrendChart departmentName={selectedDept} />
      </Paper>

      <CategoryTable />
    </Box>
  );
}
