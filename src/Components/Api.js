import {invokeScript, broadcast, nodeInteraction, waitForTx} from 'waves-transactions';
import { stringToUint8Array, sha256, base58encode } from 'waves-crypto';

export default async (setStatus, setData) => {

  setStatus('pending')

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

  let data
  const { WavesKeeper } = window;
  let status = true

  const authData = { data: {} };

  if (!WavesKeeper) {
    setStatus('0')
  } else {
    await WavesKeeper.auth(authData).then(authData => {
      data = authData
    }).catch(err => {
      status = false
      setStatus(err.code)
    })
    await WavesKeeper.publicState(authData).then(authData => {
      data.state = authData
    }).catch(err => {
      status = false
      if (err.code) {
        setStatus(err.code)
      }
    })

    if (status) {
      setData(data)
      setStatus('true')
    }
  }
}