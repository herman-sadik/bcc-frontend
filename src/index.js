import React from 'react'
import ReactDOM from 'react-dom'
import './Styles/index.css'
import App from './App'
import * as transactions from './Api/transactions'
import * as wavesKeeper from './Api/wavesKeeper'

wavesKeeper.initWavesKeeper()
transactions.init()

ReactDOM.render(<App />, document.getElementById('root'))