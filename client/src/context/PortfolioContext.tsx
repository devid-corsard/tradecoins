import { Dispatch, ReactNode, createContext, useReducer } from "react";
import PortfolioItemType from "../types/PortfolioItemType";
import { PortfolioActionTypesUnion } from "./PortfolioActions";
import portfolioReducerHandler from "./portfolioReducer";

export type PortfolioContextType = {
  portfolio: PortfolioItemType[];
  dispatch: Dispatch<PortfolioActionTypesUnion>;
};

export const INITIAL_PORTFOLIO: PortfolioItemType[] = [];

export const PortfolioContext = createContext<PortfolioContextType>({
  portfolio: INITIAL_PORTFOLIO,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  dispatch: () => {},
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
