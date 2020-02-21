import {nodeInteraction, invokeScript, broadcast, waitForTx} from 'waves-transactions'
import { stringToUint8Array, sha256, base58encode } from 'waves-crypto';

const withWavesKeeper = async tx => {

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

  const { WavesKeeper } = window;

  WavesKeeper.signAndPublishTransaction(tx).then(res => {
    console.log(res)
  }).catch(err => {
    console.log(err)
  })
}

export default withWavesKeeper
