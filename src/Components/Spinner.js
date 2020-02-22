import React from 'react'
import '../Styles/Spinner.css'

const Spinner = () => {
  return ( 
    <div className='spinner'>
      <div className='spinner-container'>
        <div className="lds-dual-ring"></div>
      </div>
    </div>
   )
}
 
export default Spinner