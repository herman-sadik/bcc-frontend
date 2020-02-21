import React from 'react'

import '../Styles/NavBar.css'
import Logo from '../assets/bcc_logo.png'

const NavBar = props => {

    return(
        <div className="NavBarContainer">
            <div className="NavBarBox">
                <div className="NavBarLogo"><img src={Logo} alt="logo_bcc"/></div>
                <div className="NavBarInfo">
                <div className="NavBarBalance"><p>Deposit:</p><p>{props.balance} BCC</p></div>
                </div>
            </div>
        </div>
    )

}

export default NavBar