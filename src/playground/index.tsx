import React from 'react'
import ReactDOM from 'react-dom/client'

import '../style.css'
import App  from './App'

const Root =  ReactDOM.createRoot(document.getElementById('app')!)
Root.render(
  // <React.StrictMode>
      <App />
  // </React.StrictMode>
)
