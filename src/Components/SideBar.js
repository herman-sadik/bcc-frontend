import React from 'react'
import Add from "@material-ui/icons/AddCircle"

import '../Styles/SideBar.css'

const SideBar = props => {
    return (
        <div className="SideBarContainer">
            <div className="Ammount"><p>Balance:</p>
                <div>{props.waves} Waves</div>
                <div>{props.bbc} BBC</div>
            </div>
            <div className="Ammount"><p>Deposit:</p>
                <div className="SideBarDeposit">{props.deposit} BBC <Add onClick={props.addDeposit}/></div>
            </div>
            <div className="SideBarBox">
                {!props.userInfo? <div className="SideBarOption" onClick={props.onCreateAccount}>createAccount</div> : null}
                <div className="SideBarOption" onClick={props.onCreateDevice}>createDevice</div>
                <div className="SideBarOption" onClick={props.onGetUser}>getUser</div>
                <div className="SideBarOption" onClick={props.onGetDevices}>get Devices</div>
                <div className="SideBarOption">sdf</div>
            </div>
        </div>
    )
}

export default SideBar