import React from 'react'
import {createAccount, deposit, createDevice, getUsers} from '../transactions'
import '../Styles/Test.css'

const Test = () => {

  return ( 
    <div className='test'>
      <button onClick={createAccount}>createAccount</button>
      <button onClick={() => deposit(25)}>deposit 25</button>
      <button onClick={createDevice}>createDevice</button>
      <button onClick={getUsers}>getUsers</button>
    </div>
   )
}
 
export default Test