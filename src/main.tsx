import React from 'react'
import ReactDOM from 'react-dom/client'
import {App} from './App.tsx'

import './global.css'

export function getRndInteger() {
  return Math.floor(Math.random() * (9999999 - 1000000) ) + 1000000;
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
