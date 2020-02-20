import {broadcast, waitForTx, nodeInteraction} from '@waves/waves-transactions'
import { stringToUint8Array, sha256, base58encode } from 'waves-crypto';

import * as transactionActions from '../transactions'

const {invokeScript} = require('@waves/waves-transactions')


export const withWaves = async func => {

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


  const tx = func();
  WavesKeeper.signAndPublishTransaction(tx).then((result) => 
    console.log(result)
  
);

}
