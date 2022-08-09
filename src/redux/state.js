const EMPTY_TRADE = { tradeId: '0', amount: '', buyPrice: '', sellPrice: '' };
const EMPTY_COIN = { coinId: '', name: '', trades: [] };

let store = {
  _state: {
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
  },
  getState() {
    return this._state;
  },
  _callSubscriber() {
    console.log('state changed');
  },
  addNewCoin() {
    const table = this._state.tablePage.table;
    table.push({
      ...EMPTY_COIN,
      coinId: table.length,
      trades: [{ ...EMPTY_TRADE }],
    });
    this._callSubscriber(this._state);
  },
  addNewTrade(coinId) {
    const trades = this._state.tablePage.table[coinId].trades;
    trades.push({ ...EMPTY_TRADE, tradeId: trades.length });
    this._callSubscriber(this._state);
  },
  editInput(coinId, tradeId, field, value) {
    if (!+value && +value !== 0) return;
    this._state.tablePage.table[coinId].trades[tradeId][field] = value;
    this._callSubscriber(this._state);
  },
  editCoinName(coinId, value) {
    this._state.tablePage.table[coinId].name = value;
    this._callSubscriber(this._state);
  },
  subscribe(observer) {
    this._callSubscriber = observer;
  },
};

export default store;
