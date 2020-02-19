import Swal from 'sweetalert2'

export default props => {

  let error = null
  if (props.status === '13') {
    Swal.fire({
      title: 'Waves Keeper account not found',
      type: 'error',
      text: 'Please sign in into your Waves Keeper account'
    })
  }
  if (props.status === '10') {
    Swal.fire({
      title: 'Please accept',
      type: 'error',
      showCancelButton: true,
      reverseButtons: true,
      confirmButtonText: 'Refresh page'
    }).then(res => {
      if (res.value) {
        window.location.reload()
      }
    })
  }
  if (props.status === '12') {
    Swal.fire({
      title: 'Access denied',
      type: 'error',
      text: 'You need to change Waves Keeper extension settings (Permission control) and allow access for this website',
    })
  }
  if (props.status === '0') {
    Swal.fire({
      title: 'Waves Keeper not found',
      type: 'error',
      text: 'Please install Waves Keeper extension',
    }).then(() => {
      props.setStatus('false')
    })
  }

  return null
}