import React from 'react'
import ReactDOM from 'react-dom'
import './Styles/index.css'
import App from './App'
import * as transactions from './transactions'

transactions.init()
ReactDOM.render(<App />, document.getElementById('root'))