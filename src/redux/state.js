let rerenderEntireTree = () => {
  console.log('state changed');
};

const EMPTY_TRADE = { tradeId: '0', amount: '', buyPrice: '', sellPrice: '' };
const EMPTY_COIN = { coinId: '', name: '', trades: [] };

let state = {
  tablePage: {
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
  },
};

export const addNewCoin = () => {
  const table = state.tablePage.table;
  table.push({
    ...EMPTY_COIN,
    coinId: table.length,
    trades: [{ ...EMPTY_TRADE }],
  });
  rerenderEntireTree(state);
};
export const addNewTrade = (coinId) => {
  const trades = state.tablePage.table[coinId].trades;
  trades.push({ ...EMPTY_TRADE, tradeId: trades.length });
  rerenderEntireTree(state);
};
export const editInput = (coinId, tradeId, field, value) => {
  if (!+value && +value !== 0) return;
  state.tablePage.table[coinId].trades[tradeId][field] = value;
  rerenderEntireTree(state);
};
export const editCoinName = (coinId, value) => {
  state.tablePage.table[coinId].name = value;
  rerenderEntireTree(state);
};
export const subscribe = (observer) => {
  rerenderEntireTree = observer;
};

export default state;
