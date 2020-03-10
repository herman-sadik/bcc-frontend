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
    },[])

    const reservationHandler = async (device) => {
      props.history.push(`/${device}/reservation-date`)
    }

    return (
    <div className="DeviceContainer">
        <div className="DeviceTitle">DEVICES</div>
        <div className="DeviceAllBox">
            {devices.map(item => 
            <div className="DevicesBox" key={item.address}>
              <div className="DeviceLabels">
            <label>Address</label>
            <label>Price</label>
            </div>
                <div className="DivacesInfo">
                    <div onClick={() => reservationHandler(item.address)} style={{cursor: "pointer"}}>{item.address}</div>
                    <div>{item.price}</div>
                </div>
                <div className="DevicesButtonContainer">
                    <button style={item.isReservedToday ? {backgroundColor: "Red"} : null} onClick={() => reservationHandler(item.address)}>Reeservation</button>
                    <button>Open</button>
                    <button>Close</button>
                </div>
            </div>
            )
            }
        </div>
    </div>
    );
}

export default withRouter(DevicesView)