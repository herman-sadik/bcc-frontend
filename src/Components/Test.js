import React from 'react'
import { deposit, createDevice, getUsers} from '../transactions'

import {createAccount} from '../transactions/createAccount'


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