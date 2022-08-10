const EMPTY_TRADE = { tradeId: '0', amount: '', buyPrice: '', sellPrice: '' };
const EMPTY_COIN = { coinId: '', name: '', trades: [] };
const ADD_NEW_TRADE = "ADD_NEW_TRADE";
const EDIT_COIN_NAME = 'EDIT_COIN_NAME';
const EDIT_NUM_INPUT = 'EDIT_NUM_INPUT';
const ADD_NEW_COIN = 'ADD_NEW_COIN';

let initialState = {
  table: [
    {
      coinId: 0,
      name: 'eth',
      trades: [
        { tradeId: 0, amount: '0.02', buyPrice: '1800', sellPrice: '1900' },
        { tradeId: 1, amount: '0.02', buyPrice: '1800', sellPrice: '1900' },
        { tradeId: 2, amount: '0.02', buyPrice: '1800', sellPrice: '1900' },
      ],
    },
    {
      coinId: 1,
      name: 'ltc',
      trades: [
        { tradeId: 0, amount: '2', buyPrice: '100', sellPrice: '120' },
        { tradeId: 1, amount: '2', buyPrice: '110', sellPrice: '' },
        { tradeId: 2, amount: '2', buyPrice: '120', sellPrice: '' },
      ],
    },
    {
      coinId: 2,
      name: 'dot',
      trades: [
        { tradeId: 0, amount: '5', buyPrice: '24', sellPrice: '12' },
        { tradeId: 1, amount: '5', buyPrice: '8', sellPrice: '' },
        { tradeId: 2, amount: '5', buyPrice: '6', sellPrice: '9' },
      ],
    },
  ],
};

const tableReducer = (state = initialState, action) => {
  const { type } = action;

  if (type === ADD_NEW_TRADE) {
    const { coinId } = action;
    const trades = state.table[coinId].trades;
    trades.push({ ...EMPTY_TRADE, tradeId: trades.length });
  } else if (type === ADD_NEW_COIN) {
    const table = state.table;
    const coinId = table.length;
    table.push({ ...EMPTY_COIN, coinId, trades: [{ ...EMPTY_TRADE }] });
  } else if (type === EDIT_NUM_INPUT) {
    const { value, coinId, tradeId, field } = action;
    if (!+value && +value !== 0) return;
    state.table[coinId].trades[tradeId][field] = value;
  } else if (type === EDIT_COIN_NAME) {
    const { value, coinId } = action;
    state.table[coinId].name = value;
  }
  return state;
};

export default tableReducer;

export const newTradeActionCreator = (coinId) => ({
  type: ADD_NEW_TRADE,
  coinId,
});
export const editNameActionCreator = (coinId, value) => ({
  type: EDIT_COIN_NAME,
  coinId,
  value,
});
export const editNumInputActionCreator = (coinId, tradeId, field, value) => ({
  type: EDIT_NUM_INPUT,
  coinId,
  tradeId,
  field,
  value,
});
export const addNewCoinActionCreator = () => ({ type: ADD_NEW_COIN });
