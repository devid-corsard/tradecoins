import React, { useContext } from "react";
import { PortfolioContext } from "../context/PortfolioContext";
import {
  PortfolioActionsEnum,
  UpdateTradeInput,
} from "../context/PortfolioActions";
import { TradeItemInputNames } from "../dto/TradeItemDto";

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
    <li>
      <h4>{props.name}</h4>
      <input type="number" value={props.value} onChange={handleChange} />
    </li>
  );
};

export default InputItem;
