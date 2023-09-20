import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/index.js'
import App from './App.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   

      <HashRouter>
      <Provider store={store}>
        <App />
    </Provider>
      </HashRouter>
  </React.StrictMode>,
)
