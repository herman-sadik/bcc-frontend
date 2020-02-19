import React, {useState, useEffect} from 'react'
import './Styles/App.css'
import authHandler from './Components/Api'
import Login from './Components/Login'
import MainView from './Components/MainView'

const  App = () => {

  const [status, setStatus] = useState('false')
  const [data, setData] = useState({})

  let page = <Login status={status} onPress={() => authHandler(setStatus, setData)} />
  if (status === 'true') {
    page = <MainView data={data} onPress={() => {setStatus('false')}}/>
  }

  useEffect(() => {
    console.log(status)
  })

  return (
    <div className="App">
      {page}
    </div>
  )
}

export default App