// import React from 'react'

import { useContext } from "react";
import { PortfolioContext } from "../context/PortfolioContext";
import InputItem from "./InputItem";
import SpanItem from "./SpanItem";
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
    <div className="">
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
      <SpanItem name="Spend:" value={data.spend} />
      <InputItem
        name="Sell price:"
        value={data.sell_price}
        propName={TradeItemInputNames.SellPrice}
        id={data.id}
      />
      <SpanItem name="Recieved:" value={data.recieved} />
      <SpanItem name="Difference:" value={data.difference} />
      <div className="">
        <button className="" onClick={handleDelete}>
          Del
        </button>
        <button className="" onClick={handleCopy}>
          Copy
        </button>
      </div>
    </div>
  );
};

export default TradeItem;
