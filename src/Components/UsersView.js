import React,{useEffect, useState} from 'react'
import * as nodeInteraction from '../Api/nodeInteraction'
import { withRouter } from 'react-router'

import '../Styles/UsersView.css'

const DevicesView = props => {

    const [users, setUsers] = useState([])

    useEffect(()=> {
      const fetchUsers = async () => {
        setUsers(await nodeInteraction.getUsers())
      }
      fetchUsers()
    }, [])

    const copyToClipboard = str => {
      navigator.clipboard.writeText(str)
    }

    const mapping = users.map(user => (
      <div className='users-box' key={user.address}>
        <div className='users-address'>
          <b>Address: </b>
          {user.address}
          <div className='users-icon'>
            <i onClick={() => copyToClipboard(user.address)} className='pi pi-copy'></i>
          </div>
        </div>
        <div className='users-balance'>
          <b>Balance: </b>
          {user.balance}
        </div>
      </div>
    ))

    return (
      <div className='users-container'>
        <div className='users-title'>USERS</div>
        {mapping}
      </div>
    )
}

export default withRouter(DevicesView)
