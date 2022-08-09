import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {
  addNewCoin,
  addNewTrade,
  editInput,
  editCoinName,
} from './redux/state';

const root = ReactDOM.createRoot(document.getElementById('root'));
export const rerenderEntireTree = (state) => {
  root.render(
    <React.StrictMode>
      <App
        state={state}
        addNewCoin={addNewCoin}
        addNewTrade={addNewTrade}
        editInput={editInput}
        editCoinName={editCoinName}
      />
    </React.StrictMode>
  );
};
