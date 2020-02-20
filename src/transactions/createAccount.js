import {broadcast, waitForTx, nodeInteraction} from '@waves/waves-transactions'
import { stringToUint8Array, sha256, base58encode } from 'waves-crypto';
const {invokeScript} = require('@waves/waves-transactions')


const nodeUrl = 'http://localhost:6869'
const multiplier = 10 ** 8
const chainId = 82
const dappAddress = '3M7tbn774Vgb3vMGpqYnTgzdrxFfusJ9cvV'

export const createAccount = async data => {

  // {
  //   assetId: String,
  //   userPrivateKey: String
  // }

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

  // const iTx = invokeScript({
  //   dApp: dappAddress,
  //   call: { function: "createAccount" },
  //   payment: [{ assetId: "63dfCSFSuwM4NrP7pgTuuaNv2vRA6sWUrevxKXJkBE14", amount: 10 * multiplier }],
  //   chainId: chainId,
  // }, {privateKey: 'BEjRFEyr7FEtjGqbUGnKvqEpM3SuixMHDVE98hNeNvyZ'})

  var tx = {
    type: 16,
    data: {
        fee: {
            "tokens": "0.005",
            "assetId": "WAVES"
        },
        dApp: dappAddress,
        call: {
            function: 'createAccount',
            args: []
        },
        payment: [
            { amount: 10* multiplier , assetId:"7tmWnCQZHGbmhKsQ7e9RhxiPkowwUtp4YCVXKvbbreEA" }
        ],
        chainId: chainId,
    }
};

WavesKeeper.signAndPublishTransaction(tx).then((result) => 
    console.log(result)
);



  //await broadcast(iTx, nodeUrl)
  
  //await waitForTx(iTx.id)
  //console.log(iTx)
}
