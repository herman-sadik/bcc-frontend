import React,{useEffect, useState} from 'react'
import * as transactions from '../Api/transactions'
import * as nodeInteraction from '../Api/nodeInteraction'
import {withWavesKeeper} from '../Api/wavesKeeper'

import '../Styles/DevicesView.css'

const DevicesView = props => {

    const [devices, setDevices] = useState([])

    const getDevices = async () => {
        const device = await nodeInteraction.getDevices();
        console.log(device)
        let deviceTab = []
        for(let key in device){
          const address = device[key].address
          const price = device[key].price
          deviceTab.push({address: address, price: price})
        }
        setDevices(deviceTab)
      }

      useEffect(()=> {
        getDevices();
      },[])

      const reservationHandler = async (device) => {
        let dateInteger = new Date().getTime()
        dateInteger += 24 * 3600 * 1000
        const date = new Date(dateInteger)
        withWavesKeeper(transactions.makeReservation(device, date))
      }

    return (
    <div className="DeviceContainer">
        <div className="DeviceAllBox">
            <div className="DeviceLabels">
            <label>Address</label>
            <label>Price</label>
            </div>
            {devices.map(item => 
            <div className="DevicesBox" key={item.address}>
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

export default DevicesView