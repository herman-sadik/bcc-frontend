import MainView from './Components/MainView'
import Test from './Components/Test'
import DatePicker from './Components/DatePicker'

export default [
  {path: '/', component: MainView, exact: true},
  {path: '/test', component: Test, exact: true},
  {path: '/:address/reservation-date', component: DatePicker, exact: true}
]