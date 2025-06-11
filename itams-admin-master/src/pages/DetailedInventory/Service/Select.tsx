import { Box, MenuItem } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useState } from "react";
import { ActionTypes } from "../../../reducer/useEditServiceToInventoryReducer";
import { Status } from "../../../interface/interface";

function SelectField(props: any) {
  const { id, initValue, data, required, disabled, dispatchEdit } = props;
  const [value, setValue] = useState(initValue);
  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value);
    dispatchEdit({
      type: ActionTypes.EDIT_STATUS,
      id: id,
      value:
        data.find((status: Status) => {
          return String(status.id) === String(event.target.value);
        })?.name ?? "",
    });
  };
  return (
    <Box>
      <Select
        id={id}
        name={id}
        // defaultValue={initValue}
        value={value}
        onChange={handleChange}
        size="small"
        variant="standard"
        sx={{
          maxWidth: "150px",
        }}
        required={required}
        disabled={disabled}
      >
        {data?.map((i: any) => {
          return (
            <MenuItem key={i.id} value={i.id}>
              {`${i.name}`}
            </MenuItem>
          );
        })}
      </Select>
    </Box>
  );
}

export default SelectField;
