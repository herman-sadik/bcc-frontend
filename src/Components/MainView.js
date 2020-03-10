import React, {useEffect, useState} from 'react'
import * as transactions from '../Api/transactions'
import * as nodeInteraction from '../Api/nodeInteraction'
import { withWavesKeeper } from '../Api/wavesKeeper'
import Swal from 'sweetalert2'
import Add from "@material-ui/icons/AddCircle"
import '../Styles/MainView.css'

const MainView = props => {

  const [userInfo, setUserInfo] = useState({}); 
  
  useEffect(() => {
    const fetchUser = async () => {
      const info = await nodeInteraction.currentUser(props.address)
      setUserInfo(info)
    }
    fetchUser()
  }, [props.address])

  const DepositHandler = async () => {
    Swal.fire({
      title: 'How many BCC you want deposit',
      input: 'number',
      inputValue: 25,
      showCancelButton: true,
    }).then(result => {
      withWavesKeeper(transactions.deposit(result.value))
    }).catch(err => {
      console.error(err)
    })
  }

  const windowdevice = (
    <div className="MainViewDataContainer">  
      <div className="MainViewData">
        <label>Adress:</label>
        <div>{userInfo.address}</div>
        <div>{userInfo.hasAccount ? "(Registered)" : "(Not registered)"}</div>
      </div>
      <div className="MainViewData">
        <label>Balance:</label>
        <div>{userInfo.wavesBalance} Waves</div>
        <div>{userInfo.bccBalance} BCC</div>
      </div>
      <div className="MainViewData">
        <label>Deposit:</label>
        <div className="ManiViewDataAdd">
          {userInfo.deposit === null ? 0 : userInfo.deposit} BCC <Add onClick={DepositHandler}/>
        </div>
      </div>
    </div>
  )

  return (
    <div className="MainViewContainer">
      <div className="MainViewTitle">User Details</div>
      <div className="MainViewContent">
        {windowdevice}
      </div>
      <div className="MainViewButton"></div>
    </div>
  )
}

export default MainView