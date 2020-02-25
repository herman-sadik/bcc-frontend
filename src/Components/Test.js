import React from 'react'
import * as transactions from '../Api/transactions'
import {withWavesKeeper} from '../Api/wavesKeeper'
import '../Styles/Test.css'

const Test = props => {

  let dateInteger = new Date().getTime()
  dateInteger += 24 * 3600 * 1000
  const date = new Date(dateInteger)

  const device = "nJKSaEFn7SmhhEdL/wFYFY7fex842Qgg0jj"

  console.log(process.env)

  return ( 
    <div className='test'>
      <button onClick={() => withWavesKeeper(transactions.createAccount())}>createAccount</button>
      <button onClick={() => withWavesKeeper(transactions.deposit(25))}>deposit 25</button>
      <button onClick={() => withWavesKeeper(transactions.createDevice(2))}>createDevice</button>
      <button onClick={async () => console.log(await transactions.currentUser(props.address))}>currentUser</button>
      <button onClick={async () => console.log(await transactions.getDevices())}>get Devices</button>
      <button onClick={async () => console.log(await transactions.getUsers())}>get Users</button>
      <button onClick={() => withWavesKeeper(transactions.makeReservation(device, date))}>reservation</button>
    </div>
   )
}
 
export default Test