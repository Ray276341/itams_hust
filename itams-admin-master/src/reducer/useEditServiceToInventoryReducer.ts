import { useReducer } from 'react';
import { ServiceToInventory } from '../interface/interface';

export const enum ActionTypes {
  EDIT_COST = 'edit_cost',
  EDIT_STATUS = 'edit_status',
  EDIT_CHECK = 'edit_check',
}

interface Actions {
  type: ActionTypes;
  id: number;
  value: string | number | boolean;
}

const reducer = (data: ServiceToInventory[], action: Actions) => {
  switch (action.type) {
    case ActionTypes.EDIT_COST:
      return data?.map((item: ServiceToInventory) => {
        if (item.id === action.id) {
          return { ...item, new_cost: action.value };
        } else {
          return item;
        }
      });
    case ActionTypes.EDIT_STATUS:
      return data?.map((item: ServiceToInventory) => {
        if (item.id === action.id) {
          return { ...item, new_status: action.value };
        } else {
          return item;
        }
      });
    case ActionTypes.EDIT_CHECK:
      return data?.map((item: ServiceToInventory) => {
        if (item.id === action.id) {
          return {
            ...item,
            check: String(action.value),
          };
        } else {
          return item;
        }
      });
  }
};

function useEditServiceToInventoryReducer(initialData: ServiceToInventory) {
  const [rows, dispatchEdit] = useReducer<any>(reducer, initialData);
  return { rows, dispatchEdit };
}
export default useEditServiceToInventoryReducer;
