import React, { useContext } from "react";
import TradeItem from "./TradeItem";
import { PortfolioContext } from "../context/PortfolioContext";
import {
  AddNewTradeAction,
  DeletePortfolioItemAction,
  PortfolioActionsEnum,
  UpdateNameAction,
} from "../types/PortfolioActions";
import PortfolioItemType from "../types/PortfolioItemType";

type Props = {
  item: PortfolioItemType;
};

const PortfolioItem = ({ item }: Props) => {
  const { dispatch } = useContext(PortfolioContext);
  const handleAddNew = () => {
    const action: AddNewTradeAction = {
      type: PortfolioActionsEnum.addNewTrade,
      payload: {
        id: item.id,
      },
    };
    dispatch(action);
  };
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const action: UpdateNameAction = {
      type: PortfolioActionsEnum.updateName,
      payload: {
        id: item.id,
        value: e.currentTarget.value,
      },
    };
    dispatch(action);
  };
  const handleDeleteTradeItem = () => {
    const action: DeletePortfolioItemAction = {
      type: PortfolioActionsEnum.deletePortfolioItem,
      payload: { id: item.id },
    };
    dispatch(action);
  };
  return (
    <div className="">
      <button className="" onClick={handleDeleteTradeItem}>
        Del all
      </button>
      <input
        type="text"
        spellCheck={false}
        placeholder="coin name"
        className=""
        value={item.name}
        onChange={handleNameChange}
      />
      <div className="">
        {item.data.map((data) => (
          <TradeItem data={data} key={data.id} />
        ))}
        <div>
          <button className="" onClick={handleAddNew}>
            Add new trade
          </button>
        </div>
      </div>
    </div>
  );
};

export default PortfolioItem;
