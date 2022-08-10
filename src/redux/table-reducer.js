const EMPTY_TRADE = { tradeId: '0', amount: '', buyPrice: '', sellPrice: '' };
const EMPTY_COIN = { coinId: '', name: '', trades: [] };
const ADD_NEW_TRADE = "ADD_NEW_TRADE";
const EDIT_COIN_NAME = 'EDIT_COIN_NAME';
const EDIT_NUM_INPUT = 'EDIT_NUM_INPUT';
const ADD_NEW_COIN = 'ADD_NEW_COIN';

const tableReducer = (state, action) => {
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
