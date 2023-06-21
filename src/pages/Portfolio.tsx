import { useContext, useEffect } from "react";
import { PortfolioContext } from "../context/PortfolioContext";
import { PortfolioActionsEnum } from "../types/PortfolioActions";
import { AuthContext } from "../context/AuthContext";
import PortfolioItem from "../components/PortfolioItem";

const Portfolio = () => {
  const { portfolio, dispatch } = useContext(PortfolioContext);
  const { user } = useContext(AuthContext);
  const handleAddNew = () => {
    console.log("add new");
  };
  useEffect(() => {
    dispatch({
      type: PortfolioActionsEnum.getPortfolio,
      payload: { id: user.id },
    });
  }, [user.id, dispatch]);

  return (
    <div className="w-11/12 mx-auto bg-pink-100 rounded-lg shadow-xl p-3 m-3">
      <p>Your trades:</p>
      <button
        className="m-1 p-1 border bg-white hover:bg-gray-100 active:bg-orange-100"
        onClick={handleAddNew}
      >
        Add new
      </button>
      {portfolio.map((item) => (
        <PortfolioItem item={item} key={item.id} />
      ))}
    </div>
  );
};

export default Portfolio;
