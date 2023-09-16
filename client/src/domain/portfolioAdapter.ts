import PortfolioDto from "../dto/PortfolioDto";
import PortfilioType, { PortfolioItemType } from "./PortfolioType";
import { TradeItemType } from "./TradeItemType";

function portfolioAdapter(portfolio: PortfolioDto): PortfilioType {
    const viewPortfolio: PortfilioType = [];
    for (const portfolioItem of portfolio.data) {
        portfolioItem.data = portfolioItem.data.map(
            (d) => new TradeItemType(d.id, d.amount, d.buy_price, d.sell_price)
        );
        viewPortfolio.push(portfolioItem as PortfolioItemType);
    }
    return viewPortfolio;
}
export default portfolioAdapter;
