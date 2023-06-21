// import React from 'react'

import { useContext } from "react";
import { PortfolioContext } from "../context/PortfolioContext";
import InputItem from "./InputItem";
import SpanItem from "./SpanItem";
import {
  CopyTradeAction,
  PortfolioActionsEnum,
} from "../types/PortfolioActions";
import TradeItemType from "../types/TradeItemType";

type Props = {
  data: TradeItemType;
};

const TradeItem = ({ data }: Props) => {
  const { dispatch } = useContext(PortfolioContext);
  const handleDelete = () => {
    console.log("delete");
  };
  const handleCopy = () => {
    const action: CopyTradeAction = {
      type: PortfolioActionsEnum.copyTrade,
      payload: { id: data.id },
    };
    dispatch(action);
    console.log("copy");
  };
  return (
    <div className="flex flex-wrap items-center justify-start rounded-sm border-gray-200 border m-1">
      <InputItem name="Amount:" value={data.amount} />
      <InputItem name="Buy price:" value={data.buy_price} />
      <SpanItem name="Spend:" value={data.spend} color="pink" />
      <InputItem name="Sell price:" value={data.sell_price} />
      <SpanItem name="Recieved:" value={data.recieved} color="green" />
      <SpanItem name="Difference:" value={data.difference} color="orange" />
      <div className="flex text-xs">
        <button
          className="m-1 p-1 border bg-red-100 hover:bg-red-200 active:bg-red-400"
          onClick={handleDelete}
        >
          Del
        </button>
        <button
          className="m-1 p-1 border bg-orange-50 hover:bg-orange-100 active:bg-orange-300"
          onClick={handleCopy}
        >
          Copy
        </button>
      </div>
    </div>
  );
};

export default TradeItem;
