import React, { useState, useEffect } from 'react'
import * as nodeInteraction from './Api/nodeInteraction'
import * as transactions from './Api/transactions'
import {withWavesKeeper} from './Api/wavesKeeper'
import './Styles/App.css'
import Spinner from './Components/Spinner'
import $ from 'jquery'
import routes from './routes'
import {Route, Switch} from 'react-router'
import SideBar from './Components/SideBar'
import NavBar from './Components/NavBar'
import Swal from 'sweetalert2'

const  App = (props) => {

  const [address, setAddress] = useState(null)
  const [userInfo, setUserInfo] = useState({})
  
  const askForData = async () => {
    const { WavesKeeper } = window
    $('document').ready(() => {
      if (WavesKeeper === undefined) {
        setTimeout(askForData, 100)
      } else {
        WavesKeeper.publicState().then(res => {
          setAddress(res.account.address)
          global.userAddress = res.account.address
        }).catch(err => {
          console.log(err)
        })
      }
    })
  }
  
  const fetchUser = async () => {
    const info = await nodeInteraction.currentUser(global.userAddress)
    setUserInfo(info)
  }

  useEffect(() => {
    setTimeout(askForData, 500)
    setTimeout(fetchUser, 600)
  }, []) // eslint-disable-line

  const DepositeHandler = async () => {
    Swal.fire({
      title: 'How many BCC you want deposit',
      input: "number",
      inputValue: 25,
      showCancelButton: true,
    }).then(result => {withWavesKeeper(transactions.deposit(result.value))})
  }

  const createDeviceHandler = async () => {
    Swal.mixin({
      input: 'text',
      confirmButtonText: 'Next &rarr;',
      showCancelButton: true,
      progressSteps: ['1', '2']
    }).queue([
      'Device Name',
      'Device Price'
    ]).then(result => {
      const [a,b] = result.value
      withWavesKeeper(transactions.createDevice(b))
    }
    )
  }

  const routesJSX = routes.map(route => (
    <Route 
      path={route.path}
      key={String(Math.random())}
      exact={route.exact}
      component={() => <route.component address={address} />}
    />
  ))

  const router = (
    <div>
      <NavBar balance={userInfo.deposit === null ? 0 : userInfo.deposit}/> 
    <div className="App">
      <SideBar
        waves={userInfo.wavesBalance}
        bbc={userInfo.bccBalance}
        deposit={userInfo.deposit === null ? 0 : userInfo.deposit}
        addDeposit={DepositeHandler}
        userInfo = {userInfo.hasAccount}
        onCreateAccount={() => withWavesKeeper(transactions.createAccount())}
        onCreateDevice={createDeviceHandler}
      /> 
    <Switch>
      {routesJSX}
    </Switch>
    </div>
    </div>
  )

  return (
    <div>
      {/* <NavBar balance={userInfo.deposit === null ? 0 : userInfo.deposit}/> 
    <div className="App">
      <SideBar
        waves={userInfo.wavesBalance}
        bbc={userInfo.bccBalance}
        deposit={userInfo.deposit === null ? 0 : userInfo.deposit}
        addDeposit={DepositeHandler}
        userInfo = {userInfo.hasAccount}
        onCreateAccount={() => withWavesKeeper(transactions.createAccount())}
        onCreateDevice={() => withWavesKeeper(transactions.createDevice())}
        onGetUser={async () => {console.log(await nodeInteraction.currentUser(props.address))}}
        onGetDevices={()=>{}}
      />  */}
      {address ? router : <Spinner />}
    </div>
  )
}

export default App