import React from 'react'
import ReactDOM from 'react-dom'
import './Styles/index.css'
import App from './App'
import * as transactions from './Api/transactions'
import * as wavesKeeper from './Api/wavesKeeper'

transactions.init()
wavesKeeper.initWavesKeeper()
wavesKeeper.askForAddress()

ReactDOM.render(<App />, document.getElementById('root'))