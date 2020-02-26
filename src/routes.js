import MainView from './Components/MainView'
import Test from './Components/Test'
import DatePicker from './Components/DatePicker'
import DevicesView from './Components/DevicesView'

export default [
  {path: '/', component: MainView, exact: true},
  {path: '/test', component: Test, exact: true},
  {path: '/:address/reservation-date', component: DatePicker, exact: true},
  {patch: '/devices', component: DevicesView, exact: true}
]