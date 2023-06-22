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
    <div className="md:w-11/12 mx-auto bg-pink-100 rounded-lg shadow-xl p-3 m-3 flex flex-col items-center">
      <span className="text-2xl bg-white p-3 rounded-sm shadow-md text-gray-600">
        Your trades:
      </span>
      {portfolio.map((item) => (
        <PortfolioItem item={item} key={item.id} />
      ))}
      <button
        className="m-1 p-1 border bg-white hover:bg-gray-100 active:bg-orange-100"
        onClick={handleAddNew}
      >
        Add new
      </button>
    </div>
  );
};

export default Portfolio;
