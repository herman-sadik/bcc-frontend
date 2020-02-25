import React from 'react'
import * as transactions from '../Api/transactions'
import {withWavesKeeper} from '../Api/wavesKeeper'
import * as nodeInteraction from '../Api/nodeInteraction'
import '../Styles/Test.css'

const Test = props => {

  let dateInteger = new Date().getTime()
  dateInteger += 0 * 24 * 3600 * 1000
  const date = new Date(dateInteger)

  const device = "gtRI7vj8yw26j9F0hls22KKek2lLfYoe4UJ"

  return ( 
    <div className='test'>
      <button onClick={() => withWavesKeeper(transactions.createAccount())}>createAccount</button>
      <button onClick={() => withWavesKeeper(transactions.deposit(25))}>deposit 25</button>
      <button onClick={() => withWavesKeeper(transactions.createDevice(2))}>createDevice</button>
      <button onClick={async () => console.log(await nodeInteraction.currentUser(props.address))}>currentUser</button>
      <button onClick={async () => console.log(await nodeInteraction.getDevices())}>get Devices</button>
      <button onClick={async () => console.log(await nodeInteraction.getUsers())}>get Users</button>
      <button onClick={() => withWavesKeeper(transactions.makeReservation(device, date))}>reservation</button>
      <button onClick={async () => console.log(await nodeInteraction.checkIfDeviceReserved(device))}>checkIfDeviceReserved</button>
    </div>
   )
}
 
export default Test