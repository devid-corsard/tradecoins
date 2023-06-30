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
    <div className="md:w-11/12 w-full mx-auto bg-slate-900 md:rounded-lg md:shadow-xl md:p-3 py-3 m-3 flex flex-col items-center">
      <span className="text-2xl mx-auto font-medium text-amber-600 border-2 py-2 px-4 w-max border-amber-600">
        Your trades:
      </span>
      {portfolio.map((item) => (
        <PortfolioItem item={item} key={item.id} />
      ))}
      <button
        className="mt-5 py-1 px-4 bg-slate-700 text-emerald-500 border border-amber-500 hover:bg-slate-800 active:bg-amber-700"
        onClick={handleAddNew}
      >
        Add new coin
      </button>
    </div>
  );
};

export default Portfolio;
