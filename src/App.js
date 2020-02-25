import React, { useState, useEffect } from 'react'
import './Styles/App.css'
import Spinner from './Components/Spinner'
import $ from 'jquery'
import routes from './routes'
import {Route, Switch} from 'react-router'

const  App = () => {

  const [address, setAddress] = useState(null)

  const askForData = async () => {
    const { WavesKeeper } = window
    $('document').ready(() => {
      if (WavesKeeper === undefined) {
        setTimeout(askForData, 100)
      } else {
        WavesKeeper.publicState().then(res => {
          setAddress(res.account.address)
        }).catch(err => {
          console.log(err)
        })
      }
    })
  }

  useEffect(() => {
    setTimeout(askForData, 500)
  }, [])

  const routesJSX = routes.map(route => (
    <Route 
      path={route.path}
      exact={route.exact}
      component={() => <route.component address={address} />}
      key={route.path}
    />
  ))

  const router = (
    <Switch>
      {routesJSX}
    </Switch>
  )

  return (
    <div className="App">
      {address ? router : <Spinner />}
    </div>
  )
}

export default App