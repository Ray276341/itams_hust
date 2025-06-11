import { Box, TextField } from "@mui/material";
import { useState } from "react";
import { ActionTypes } from "../../../reducer/useEditAssetToInventoryReducer";

function Input(props: any) {
  const {
    id,
    disabled,
    fullWidth,
    required,
    multiline,
    initValue,
    dispatchEdit,
  } = props;
  const [value, setValue] = useState(initValue);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    dispatchEdit({
      type: ActionTypes.EDIT_COST,
      id: id,
      value: event.target.value,
    });
  };
  return (
    <Box sx={{ maxWidth: "100px" }}>
      <TextField
        id={id}
        size="small"
        variant="standard"
        disabled={disabled}
        fullWidth={fullWidth}
        value={value}
        onChange={handleChange}
        required={required}
        multiline={multiline}
        minRows={3}
      />
    </Box>
  );
}

export default Input;
