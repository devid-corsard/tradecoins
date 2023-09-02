// import React from 'react'

import { useContext } from "react";
import { PortfolioContext } from "../context/PortfolioContext";
import InputItem from "./InputItem";
import ViewItem from "./ViewItem";
import {
  CopyTradeAction,
  DeleteTradeAction,
  PortfolioActionsEnum,
} from "../types/PortfolioActions";
import { TradeItemDto, TradeItemInputNames } from "../dto/TradeItemDto";

type Props = {
  data: TradeItemDto;
};

const TradeItem = ({ data }: Props) => {
  const { dispatch } = useContext(PortfolioContext);
  const handleDelete = () => {
    const action: DeleteTradeAction = {
      type: PortfolioActionsEnum.deleteTrade,
      payload: { id: data.id },
    };
    dispatch(action);
  };
  const handleCopy = () => {
    const action: CopyTradeAction = {
      type: PortfolioActionsEnum.copyTrade,
      payload: { id: data.id },
    };
    dispatch(action);
  };
  return (
    <div className="trade-item">
      <ul>
        <InputItem
          name="Amount:"
          value={data.amount}
          propName={TradeItemInputNames.Amount}
          id={data.id}
        />
        <InputItem
          name="Buy price:"
          value={data.buy_price}
          propName={TradeItemInputNames.BuyPrice}
          id={data.id}
        />
        <ViewItem name="Spend:" value={data.spend} />
        <InputItem
          name="Sell price:"
          value={data.sell_price}
          propName={TradeItemInputNames.SellPrice}
          id={data.id}
        />
        <ViewItem name="Recieved:" value={data.recieved} />
        <ViewItem name="Difference:" value={data.difference} />
      </ul>
      <div className="buttons-del-copy">
        <button className="left bad" onClick={handleDelete}>
          Del
        </button>
        <button className="right neutral" onClick={handleCopy}>
          Copy
        </button>
      </div>
    </div>
  );
};

export default TradeItem;
