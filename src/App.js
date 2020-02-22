import React, { useState, useEffect } from 'react'
import './Styles/App.css'
import MainView from './Components/MainView'
import Spinner from './Components/Spinner'
import $ from 'jquery'


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

  return (
    <div className="App">
      {address ? <MainView address={address} /> : <Spinner />}
    </div>
  )
}

export default App