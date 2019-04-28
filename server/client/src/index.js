import React from 'react';
import { render } from 'react-dom';
import App from './components/App';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';
import Reducer from './reducers/Reducer';
let store = createStore(Reducer, applyMiddleware(reduxThunk));

render(<Provider store={store}><App /></Provider>, document.getElementById('root'));