import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import reducer from './reducers';
import sagas from './sagas';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(sagas);

ReactDOM.render(
<Provider store = {store}>
<BrowserRouter>
<App />
</BrowserRouter>
</Provider>
,
 document.getElementById('root')
);

serviceWorker.unregister();
