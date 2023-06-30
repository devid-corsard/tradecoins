import { ReactNode, createContext, useReducer } from "react";
import PortfolioItemType from "../types/PortfolioItemType";
import { PortfolioContextType } from "../types/PortfolioContextType";
import { INITIAL_PORTFOLIO } from "./inits";
import { PortfolioActionTypesUnion } from "../types/PortfolioActions";
import portfolioReducerHandler from "../utils/portfolioReducer";

export const PortfolioContext = createContext<PortfolioContextType>({
  portfolio: INITIAL_PORTFOLIO,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  dispatch: () => { },
});

type Props = { children: ReactNode };

export const PortfolioContextProvider = ({ children }: Props) => {
  const portfolioReducer = (
    state: PortfolioItemType[],
    action: PortfolioActionTypesUnion
  ): PortfolioItemType[] => {
    return (
      portfolioReducerHandler[action.type] as (
        state: PortfolioItemType[],
        action: PortfolioActionTypesUnion
      ) => PortfolioItemType[]
    )(state, action);
  };

  const [portfolio, dispatch] = useReducer(portfolioReducer, INITIAL_PORTFOLIO);

  return (
    <PortfolioContext.Provider value={{ portfolio, dispatch }}>
      {children}
    </PortfolioContext.Provider>
  );
};
