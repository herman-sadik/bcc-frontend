import React from 'react'

import '../Styles/SideBar.css'

const SideBar = props => {
    return (
        <div className="SideBarContainer">
            <div className="Ammount"><p>Balance:</p>
                <div>{props.waves} Waves</div>
                <div>{props.bbc} BBC</div>
            </div>
            <div className="Ammount"><p>Deposit:</p>
                <div>{props.deposit} BBC</div>
            </div>
            <div className="SideBarBox">
                <div className="SideBarOption" onClick={props.onCreateAccount}>createAccount</div>
                <div className="SideBarOption" onClick={props.onCreateDevice}>createDevice</div>
                <div className="SideBarOption" onClick={props.onGetUser}>getUser</div>
                <div className="SideBarOption">sdf</div>
                <div className="SideBarOption">sdf</div>
            </div>
        </div>
    )
}

export default SideBar