import {nodeInteraction, invokeScript, broadcast, waitForTx} from 'waves-transactions'
import { stringToUint8Array, sha256, base58encode } from 'waves-crypto';
import Swal from 'sweetalert2'

export const initWavesKeeper = () => {
  window.wc = {
    stringToUint8Array,
    sha256,
    base58encode,
  }
  window.wt = {
    nodeInteraction,
    invokeScript,
    broadcast,
    waitForTx,
  }
}

export const withWavesKeeper = async tx => {

  const { WavesKeeper } = window

  WavesKeeper.signAndPublishTransaction(tx).then(res => {
    console.log(res)
    Swal.fire({
      title : 'Good job!',
      text: 'Success!',
      icon : 'success',
    })
  }).catch(err => {
    console.log(err)
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: err.data ? (err.data).charAt(45).toUpperCase() + (err.data).slice(46) : "User reject transaction",
    })

  })
}

export const askForAddress = async () => {

  const { WavesKeeper } = window

  WavesKeeper.publicState().then(res => {
    console.log(res)
  }).catch(err => {
    console.log(err)
  })
}