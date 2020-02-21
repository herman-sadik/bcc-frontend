import React, {useState, useEffect} from 'react'
import './Styles/App.css'
import authHandler from './Components/Api'
import Login from './Components/Login'
import MainView from './Components/MainView'

const  App = () => {

  const [status, setStatus] = useState('true')
  const [address, setAddress] = useState(null)

  let page = <Login status={status} onPress={() => authHandler(setStatus, setAddress)} />
  if (status === 'true') {
    page = <MainView address={address} />
  }

  useEffect(() => {
    console.log(status)
  })

  return (
    <div className="App">
      {page}
      {/* <Test /> */}
    </div>
  )
}

export default App