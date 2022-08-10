import { editNameActionCreator, newTradeActionCreator } from '../../../redux/table-reducer';
import Trade from './Trade/Trade';



const Coin = ({ state: coin, dispatch }) => {
  const { coinId, name } = coin;
  const trades = coin.trades.map((trade) => (
    <Trade
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
      <input
        value={name}
        placeholder="name"
        maxLength="15"
        onChange={editName}
      />
      <div>{trades}</div>
      <button onClick={newTrade}>Add</button>
      <hr />
    </div>
  );
};

export default Coin;
