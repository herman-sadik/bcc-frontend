import React from 'react'
import * as transactions from '../transactions'
import withWavesKeeper from '../withWavesKeeper'
import '../Styles/MainView.css'
import NavBar from './NavBar'


const MainView = (props) => {
		console.log(props.data)


    return(
    <div>
     <NavBar balance={(props.data.state.account.balance.available / (10 ** 8)).toFixed(4)}/>   
    <div className="MainViewContainer">
        <div className="MainViewContent">
            <div className="MainViewDataContainer">
                <div className="MainViewData">
                    <label>Name:</label><div>{props.data.state.account.name}</div>
                    </div>    
                <div className="MainViewData">
                    <label>Adress:</label><div>{props.data.state.account.address}</div>
                </div>
                <div className="MainViewData">
                    <label>Public Key:</label><div>{props.data.state.account.publicKey}</div>
                </div>
                <div className="MainViewData">
                    <label>Balance:</label><div>{props.data.state.account.balance.available}</div>
                </div>
            </div>
            <div className='test'>
                <button onClick={() => withWavesKeeper(transactions.createAccount())}>createAccount</button>
                <button onClick={() => withWavesKeeper(transactions.deposit(25))}>deposit 25</button>
                <button onClick={() => withWavesKeeper(transactions.createDevice())}>createDevice</button>
                <button onClick={() => console.log(transactions.getUsers())}>getUsers</button>
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