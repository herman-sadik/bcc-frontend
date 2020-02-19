import React from 'react'
import '../Styles/MainView.css'

const MainView = (props) => {
    console.log(props.data)
    return(
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
        </div>
        <div className="MainViewButton">
                <button onClick={props.onPress}>Sign out</button>
        </div>
    </div>
    )
}

export default MainView