import React, {useState, useEffect} from 'react'
import {Calendar} from 'primereact/calendar'
import {Button} from 'primereact/button'
import {deviceReservedDays} from '../Api/nodeInteraction'
import {withRouter} from 'react-router'
import {withWavesKeeper} from '../Api/wavesKeeper'
import * as transactions from '../Api/transactions'
import '../Styles/DatePicker.css'

const DatePicker = props => {

  const [date, setDate] = useState(null)
  const [disabledDays, setDisabledDays] = useState([])

  const deviceAddress = () => (
    props.history.location.pathname.substring(1).replace('/reservation-date', '')
  )

  useEffect(() => {
    const fetchDays = async () => {
      setDisabledDays(await deviceReservedDays(deviceAddress()))
    }
    fetchDays()
  }, []) // eslint-disable-line

  const reservationHandler = async () => {
    await withWavesKeeper(transactions.makeReservation(deviceAddress(), date))
    props.history.push('/devices')
  }

  return ( 
    <div className='date-picker'>
      <h4>Choose available date</h4>
      <Calendar 
        inline={true}
        value={date}
        onChange={e => setDate(e.value)}
        disabledDates={disabledDays}
      />
      <br /><br />
      <Button label='Confirm' onClick={reservationHandler} />
    </div>
   )
}
 
export default withRouter(DatePicker)