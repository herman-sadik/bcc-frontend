import React, {useEffect, useState} from 'react'
import * as transactions from '../transactions'
import {withWavesKeeper} from '../wavesKeeper'
import '../Styles/MainView.css'
import NavBar from './NavBar'


const MainView = (props) => {
        console.log(props.data)

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
    <div className="MainViewContainer">
        <div className="MainViewContent">
            <div className="MainViewDataContainer">
                <div className="MainViewData">
                    <label>Name:</label><div><p>{props.data.state.account.name}</p></div>
                    </div>    
                <div className="MainViewData">
                    <label>Adress:</label><div><p>{props.data.state.account.address}</p></div>
                </div>
                <div className="MainViewData">
                    <label>Public Key:</label><div><p>{props.data.state.account.publicKey}</p></div>
                </div>
                <div className="MainViewData">
                    <label>Balance:</label><div>{(props.data.state.account.balance.available / (10 ** 8)).toFixed(4)} Waves</div><div>{userInfo.bccBalance} BCC</div>
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
                <button onClick={props.onPress}>Sign out</button>
        </div>
    </div>
    </div>
    )
}

export default MainView