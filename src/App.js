import React, { useState, useEffect } from 'react'
import './Styles/App.css'
import MainView from './Components/MainView'
import Spinner from './Components/Spinner'
import $ from 'jquery'
import Test from './Components/Test'


const  App = () => {

  const [address, setAddress] = useState(null)

  const askForData = async () => {
    const { WavesKeeper } = window
    $('document').ready(() => {
      if (WavesKeeper === undefined) {
        setTimeout(askForData, 100)
      } else {
        WavesKeeper.publicState().then(res => {
          setAddress(res.account.address)
        }).catch(err => {
          console.log(err)
        })
      }
    })
  }

  useEffect(() => {
    setTimeout(askForData, 500)
  }, [])

  const content = window.location.pathname !== '/test' ? <MainView address={address} /> : <Test address={address}/>

  return (
    <div className="App">
      {address ? content : <Spinner />}
    </div>
  )
}

export default App