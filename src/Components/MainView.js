import React, {useEffect, useState} from 'react'
import * as transactions from '../Api/transactions'
import {withWavesKeeper} from '../Api/wavesKeeper'
import '../Styles/MainView.css'
import NavBar from './NavBar'
import SideBar from './SideBar'


const MainView = () => {

    const [userInfo, setUserInfo] = useState({}); 
        
    // useEffect(async()=> {
    //     setUserInfo(await transactions.currentUser())
    // })   

    useEffect(() => {
        const fetchUser = async () => {
            const info = await transactions.currentUser()
            setUserInfo(info)
        }
        fetchUser()
    }, []) // eslint-disable-line


    return(
    <div>
     <NavBar balance={userInfo.deposit}/> 
     <div className="MainPageFull">
     <SideBar
        waves={userInfo.wavesBalance}
        bbc={userInfo.bccBalance}
        deposit={userInfo.deposit}
        onCreateAccount={() => withWavesKeeper(transactions.createAccount())}
        onCreateDevice={() => withWavesKeeper(transactions.createDevice())}
        onGetUser={async () => console.log(await transactions.currentUser())}
        />  
    <div className="MainViewContainer">
        <div className="MainViewContent">
            <div className="MainViewDataContainer">  
                <div className="MainViewData">
                    <label>Adress:</label><div><p>{userInfo.address}</p></div>
                </div>
                <div className="MainViewData">
                    <label>Balance:</label><div>{(0 / (10 ** 8)).toFixed(4)} Waves</div><div>{userInfo.bccBalance} BCC</div>
                </div>
            </div>
            <div className='ButtonContainer'>
                <button onClick={() => withWavesKeeper(transactions.createAccount())}>createAccount</button>
                <button onClick={() => withWavesKeeper(transactions.deposit(25))}>deposit 25</button>
                <button onClick={() => withWavesKeeper(transactions.createDevice())}>createDevice</button>
                <button onClick={async () => console.log(await transactions.currentUser())}>getUsers</button>
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