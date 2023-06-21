import React, { useContext } from "react";
import { PortfolioContext } from "../context/PortfolioContext";
import {
  PortfolioActionsEnum,
  UpdateTradeInput,
} from "../types/PortfolioActions";
import { TradeItemInputNames } from "../types/TradeItemType";

type Props = {
  name: string;
  value: string;
  propName: TradeItemInputNames;
  id: string;
};

const InputItem = (props: Props) => {
  const { dispatch } = useContext(PortfolioContext);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const action: UpdateTradeInput = {
      type: PortfolioActionsEnum.updateTradeInput,
      payload: {
        id: props.id,
        value: e.currentTarget.value,
        propName: props.propName,
      },
    };
    dispatch(action);
  };
  return (
    <div className="flex flex-col">
      <p className="text-xs text-left ml-1 text-gray-500">{props.name}</p>
      <input
        className="w-28 h-8 rounded-sm p-1 border-solid border m-1"
        type="number"
        value={props.value}
        onChange={handleChange}
      />
    </div>
  );
};

export default InputItem;
