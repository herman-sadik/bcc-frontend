import React,{useEffect, useState} from 'react'
import * as nodeInteraction from '../Api/nodeInteraction'
import {withRouter} from 'react-router'
import '../Styles/DevicesView.css'

const DevicesView = props => {

  const [devices, setDevices] = useState([])

  useEffect(()=> {
    const getDevices = async () => {
      setDevices(await nodeInteraction.getDevices())
    }
    getDevices()
  }, [])

  const reservationHandler = async (device) => {
    props.history.push(`/${device}/reservation-date`)
  }

  const mapping = devices.map(device => (
    <div className="DevicesBox" key={device.address}>
      <div className="DeviceLabels">
        <label>Address</label>
        <label>Price</label>
      </div>
      <div className="DivacesInfo">
        <div onClick={() => reservationHandler(device.address)} style={{cursor: "pointer"}}>{device.address}</div>
        <div>{device.price}</div>
      </div>
      <div className="DevicesButtonContainer">
        <button style={device.isReservedToday ? {backgroundColor: "Red"} : null} onClick={() => reservationHandler(device.address)}>Reeservation</button>
        <button>Open</button>
        <button>Close</button>
      </div>
    </div>
  ))

  return (
    <div className="DeviceContainer">
      <div className="DeviceTitle">DEVICES</div>
      <div className="DeviceAllBox">
        {mapping}
      </div>
    </div>
  )
}

export default withRouter(DevicesView)