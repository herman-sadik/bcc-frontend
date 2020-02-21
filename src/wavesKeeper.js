import {nodeInteraction, invokeScript, broadcast, waitForTx} from 'waves-transactions'
import { stringToUint8Array, sha256, base58encode } from 'waves-crypto';

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

  const { WavesKeeper } = window;

  WavesKeeper.signAndPublishTransaction(tx).then(res => {
    console.log(res)
  }).catch(err => {
    console.log(err)
  })
}