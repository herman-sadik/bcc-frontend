import React, {useState, useEffect} from 'react'
import './Styles/App.css'
import authHandler from './Components/Api'
import Login from './Components/Login'
import MainView from './Components/MainView'
import Test from './Components/Test'

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
      {/* {page} */}
      <Test />
    </div>
  )
}

export default App