import { useContext, useEffect } from "react";
import { PortfolioContext } from "../context/PortfolioContext";
import {
  AddNewPortfolioItemAction,
  PortfolioActionsEnum,
} from "../types/PortfolioActions";
import { AuthContext } from "../context/AuthContext";
import PortfolioItem from "../components/PortfolioItem";

const Portfolio = () => {
  const { portfolio, dispatch } = useContext(PortfolioContext);
  const { user } = useContext(AuthContext);
  const handleAddNew = () => {
    const action: AddNewPortfolioItemAction = {
      type: PortfolioActionsEnum.addNewPortfolioItem,
    };
    dispatch(action);
  };
  useEffect(() => {
    dispatch({
      type: PortfolioActionsEnum.getPortfolio,
      payload: { id: user.id },
    });
  }, [user.id, dispatch]);

  return (
    <div className="">
      <span className="">Your trades:</span>
      {portfolio.map((item) => (
        <PortfolioItem item={item} key={item.id} />
      ))}
      <button className="" onClick={handleAddNew}>
        Add new coin
      </button>
    </div>
  );
};

export default Portfolio;
