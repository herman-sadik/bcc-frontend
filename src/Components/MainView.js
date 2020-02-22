import React, {useEffect, useState} from 'react'
import * as transactions from '../Api/transactions'
import {withWavesKeeper} from '../Api/wavesKeeper'
import Swal from 'sweetalert2'
import '../Styles/MainView.css'
import NavBar from './NavBar'
import SideBar from './SideBar'


const MainView = () => {

    const [userInfo, setUserInfo] = useState({}); 
    const [devices, setDevices] = useState([])
    const [userInfos, setUSerInfos] = useState(true)
        
    // useEffect(async()=> {
    //     setUserInfo(await transactions.currentUser())
    // }) 
    
    const fetchUser = async () => {
        const info = await transactions.currentUser()
        setUserInfo(info)
    }

    useEffect(() => {
        fetchUser()
    }, []) // eslint-disable-line


    const getDevices = async () => {
        const device = await transactions.getDevices();
        console.log(device)
        let deviceTab = []
        for(let key in device){
            const address = device[key].address
            const price = device[key].price
            deviceTab.push({address: address, price: price})
        }
        setDevices(deviceTab)
        console.log(deviceTab)
        setUSerInfos(false)
    }



    const Windowdevice = userInfos ? (<div className="MainViewDataContainer">  
    <div className="MainViewData">
        <label>Adress:</label><div>{userInfo.address}</div><div>{userInfo.hasAccount ? "(Registered)" : "(Not registered)"}</div>
    </div>
    <div className="MainViewData">
        <label>Balance:</label><div>{userInfo.wavesBalance} Waves</div><div>{userInfo.bccBalance} BCC</div>
    </div>
    </div>) : 
    (<div>
         {devices.map(item => 
            <div key={item.address}>
                <div>{item.address}</div>
                <div>{item.price}</div>
            </div>
        )
        }
    </div> )


    return(
    <div>
     <NavBar balance={userInfo.deposit === null ? 0 : userInfo.deposit}/> 
     <div className="MainPageFull">
     <SideBar
        waves={userInfo.wavesBalance}
        bbc={userInfo.bccBalance}
        deposit={userInfo.deposit === null ? 0 : userInfo.deposit}
        userInfo = {userInfo.hasAccount}
        onCreateAccount={() => withWavesKeeper(transactions.createAccount())}
        onCreateDevice={() => withWavesKeeper(transactions.createDevice())}
        onGetUser={async () => {console.log(await transactions.currentUser()); setUSerInfos(true)}}
        onGetDevices={getDevices}
        />  
    <div className="MainViewContainer">
        <div className="MainViewContent">
        {Windowdevice}
            <div className='ButtonContainer'>
                {!userInfo.hasAccount ? <button onClick={() => withWavesKeeper(transactions.createAccount())}>createAccount</button> : null}
                <button onClick={() => withWavesKeeper(transactions.deposit(25))}>deposit 25</button>
                <button onClick={() => withWavesKeeper(transactions.createDevice())}>createDevice</button>
                <button onClick={async () => {console.log(await transactions.currentUser());setUSerInfos(true)}}>getUser</button>
            </div>
            <div className='ButtonContainer'>
            <button onClick={getDevices}>get Devices</button>
            </div>
        </div>
        <div className="MainViewButton">
                <button>Sign out</button>
        </div>
    </div>
    </div>
    </div>
    )
}

export default MainView