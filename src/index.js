import React from 'react'
import ReactDOM from 'react-dom'
import './Styles/index.css'
import App from './App'
import * as transactions from './transactions'
import * as wavesKeeper from './wavesKeeper'

transactions.init()
wavesKeeper.initWavesKeeper()

ReactDOM.render(<App />, document.getElementById('root'))