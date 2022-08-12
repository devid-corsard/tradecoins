import { editNameActionCreator, newTradeActionCreator } from '../../../redux/table-reducer';
import Coin from './Coin';
import TradeContainer from './Trade/TradeContainer';

const CoinContainer = ({ state: coin, dispatch }) => {
  const { coinId, name } = coin;
  const trades = coin.trades.map((trade) => (
    <TradeContainer
      state={trade}
      key={trade.tradeId}
      coinId={coinId}
      dispatch={dispatch}
    />
  ));
  const newTrade = () => {
    const action = newTradeActionCreator(coinId);
    dispatch(action);
  };
  const editName = (e) => {
    const action = editNameActionCreator(coinId, e.target.value);
    dispatch(action);
  };

  return (
    <div>
      <Coin 
        input={{value: name, placeholder: 'Name', maxLength: '15', action: editName}}
        trades={trades}
        button={{ addAction: newTrade, name: 'Add new coin'}}
      />
    </div>
  );
};

export default CoinContainer;
