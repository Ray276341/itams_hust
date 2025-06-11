import * as React from "react";
import { Box, Checkbox } from "@mui/material";
import { ActionTypes } from "../../../reducer/useEditAssetToInventoryReducer";
import { updateAssetToInventory } from "../../../api/inventory";
import { toast } from "react-toastify";
import { Status } from "../../../interface/interface";

function Check(props: any) {
  const { id, disabled, required, initValue, dispatchEdit, item, data } = props;
  const [checked, setChecked] = React.useState(initValue);
  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      dispatchEdit({
        type: ActionTypes.EDIT_CHECK,
        id: id,
        value: event.target.checked,
      });
      setChecked(event.target.checked);
      await updateAssetToInventory(id, {
        assetId: item.asset_id,
        new_cost: item.new_cost,
        newStatusId:
          data.find((status: Status) => {
            return status.name === item.new_status;
          })?.id ?? 0,
        check: Boolean(event.target.checked),
      });
    } catch (err: any) {
      console.log("Update asset to inventory", err);
      toast.error(err.response.data.message);
      dispatchEdit({
        type: ActionTypes.EDIT_CHECK,
        id: id,
        value: !event.target.checked,
      });
      setChecked(!event.target.checked);
    }
  };
  return (
    <Box>
      <Checkbox
        id={id}
        size="small"
        disabled={disabled}
        checked={checked}
        onChange={handleChange}
        required={required}
      />
    </Box>
  );
}

export default Check;
