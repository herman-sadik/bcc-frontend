import React, {useEffect, useState} from 'react'
import * as transactions from '../Api/transactions'
import * as nodeInteraction from '../Api/nodeInteraction'
import {withWavesKeeper} from '../Api/wavesKeeper'
import Swal from 'sweetalert2'
import Add from "@material-ui/icons/AddCircle"

import '../Styles/MainView.css'

const MainView = props => {

  const [userInfo, setUserInfo] = useState({}); 
  // const [devices, setDevices] = useState([])
  // const [userInfos, setUSerInfos] = useState(true)
  const devices = []
  const userInfos = true
  
  const fetchUser = async () => {
    const info = await nodeInteraction.currentUser(props.address)
    setUserInfo(info)
  }

  useEffect(() => {
    fetchUser()
  }, []) // eslint-disable-line

  // const getDevices = async () => {
  //   const device = await nodeInteraction.getDevices();
  //   console.log(device)
  //   let deviceTab = []
  //   for(let key in device){
  //     const address = device[key].address
  //     const price = device[key].price
  //     deviceTab.push({address: address, price: price})
  //   }
  //   setDevices(deviceTab)
  //   console.log(deviceTab)
  //   setUSerInfos(false)
  // }

  const DepositeHandler = async () => {
    Swal.fire({
      title: 'How many BCC you want deposit',
      input: "number",
      inputValue: 25,
      showCancelButton: true,
    }).then(result => {withWavesKeeper(transactions.deposit(result.value))})
  }

  const reservationHandler = async (device) => {
    let dateInteger = new Date().getTime()
    dateInteger += 24 * 3600 * 1000
    const date = new Date(dateInteger)
    withWavesKeeper(transactions.makeReservation(device, date))
  }

  const Windowdevice = userInfos ? (<div className="MainViewDataContainer">  
  <div className="MainViewData">
    <label>Adress:</label><div>{userInfo.address}</div><div>{userInfo.hasAccount ? "(Registered)" : "(Not registered)"}</div>
  </div>
  <div className="MainViewData">
    <label>Balance:</label><div>{userInfo.wavesBalance} Waves</div><div>{userInfo.bccBalance} BCC</div>
  </div>
  <div className="MainViewData">
        <label>Deposit:</label><div className="ManiViewDataAdd">{userInfo.deposit === null ? 0 : userInfo.deposit} BCC <Add onClick={DepositeHandler}/></div>
    </div>
  </div>) : 
  (<div className="DeviceContainer">
    <div className="DeviceLabels">
    <label>Address</label>
    <label>Price</label>
    </div>
     {devices.map(item => 
      <div className="DevicesBox" key={item.address}>
        <div onClick={() => reservationHandler(item.address)} style={{cursor: "pointer"}}>{item.address}</div>
        <div>{item.price}</div>
      </div>
    )
    }
  </div> )

  return(
  <div className="MainViewContainer">
    <div className="MainViewContent">
    {Windowdevice}
      {/* <div className='ButtonContainer'>
        {!userInfo.hasAccount ? <button onClick={() => withWavesKeeper(transactions.createAccount())}>createAccount</button> : null}
        <button onClick={DepositeHandler}>deposit BCC</button>
        <button onClick={() => withWavesKeeper(transactions.createDevice())}>createDevice</button>
        <button onClick={async () => {console.log(await nodeInteraction.currentUser(props.address));setUSerInfos(true)}}>getUser</button>
      </div>
      <div className='ButtonContainer'>
      <button onClick={getDevices}>get Devices</button>
      </div> */}
    </div>
    <div className="MainViewButton">
    </div>
  </div>
  )
}

export default MainView