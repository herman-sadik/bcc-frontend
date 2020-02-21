import React from 'react'
import * as transactions from '../transactions'
import {withWavesKeeper} from '../wavesKeeper'
import '../Styles/Test.css'

const Test = () => {

  return ( 
    <div className='test'>
      <button onClick={() => withWavesKeeper(transactions.createAccount())}>createAccount</button>
      <button onClick={() => withWavesKeeper(transactions.deposit(25))}>deposit 25</button>
      <button onClick={() => withWavesKeeper(transactions.createDevice())}>createDevice</button>
      <button onClick={async () => console.log(await transactions.currentUser())}>currentUser</button>
      <button onClick={async () => console.log(await transactions.getDevices())}>get Devices</button>
      <button onClick={async () => console.log(await transactions.getUsers())}>get Users</button>
    </div>
   )
}
 
export default Test