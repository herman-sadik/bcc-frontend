import React from 'react'
import ReactDOM from 'react-dom'
import './Styles/index.css'
import App from './App'
import * as wavesKeeper from './Api/wavesKeeper'
import * as nodeInteraction from './Api/nodeInteraction'

wavesKeeper.initWavesKeeper()
nodeInteraction.init()

ReactDOM.render(<App />, document.getElementById('root'))