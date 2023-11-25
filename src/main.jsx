import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./reducers";

let store = createStore(rootReducer);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
    
  ,
)
