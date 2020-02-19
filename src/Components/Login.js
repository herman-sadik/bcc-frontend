import React from 'react'
import Error from '../Components/Error'

import '../Styles/Login.css'

const Login = (props) => {
    return (
        <div className="Container">
            <div className="Buttons">
                <button onClick={props.onPress}>Click to Start</button>
                <div className="SpinnerBox">
                    <Error status={props.status} setStatus={props.setStatus}/>
                </div>
            </div>
        </div>
    )
}

export default Login