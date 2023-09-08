import React, { useContext } from "react";
import TradeItem from "./TradeItem";
import { PortfolioContext } from "../context/PortfolioContext";
import {
  AddNewTradeAction,
  DeletePortfolioItemAction,
  PortfolioActionsEnum,
  UpdateNameAction,
} from "../context/PortfolioActions";
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
    <div className="portfolio-item">
      <input
        type="text"
        spellCheck={false}
        placeholder="coin name"
        value={item.name}
        onChange={handleNameChange}
      />
      <button className="outside bad" onClick={handleDeleteTradeItem}>
        Del all
      </button>
      {item.data.map((data) => (
        <TradeItem data={data} key={data.id} />
      ))}
      <button className="wide" onClick={handleAddNew}>
        Add new trade
      </button>
    </div>
  );
};

export default PortfolioItem;
