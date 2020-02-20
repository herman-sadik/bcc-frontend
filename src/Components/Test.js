import React from 'react'
import {deposit, createDevice, getUsers, createAccount} from '../transactions'

import {withWaves} from '../transactions/createAccount'


import '../Styles/Test.css'

const Test = () => {

  return ( 
    <div className='test'>
      <button onClick={() => withWaves(createAccount)}>createAccount</button>
      <button onClick={() => withWaves(deposit)}>deposit 25</button>
      <button onClick={() => withWaves(createDevice)}>createDevice</button>
      {/* <button onClick={() => withWaves(getUsers)}>getUsers</button> */}
    </div>
   )
}
 
export default Test