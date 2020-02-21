import React from 'react'
import * as transactions from '../transactions'

import {withWaves} from '../transactions/createAccount'
import '../Styles/Test.css'

const Test = () => {

  return ( 
    <div className='test'>
      <button onClick={() => withWaves(transactions.createAccount)}>createAccount</button>
      <button onClick={() => withWaves(transactions.deposit)}>deposit 25</button>
      <button onClick={() => withWaves(transactions.createDevice)}>createDevice</button>
    </div>
   )
}
 
export default Test