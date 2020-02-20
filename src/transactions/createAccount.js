import {broadcast, transfer} from '@waves/waves-transactions'
const {invokeScript} = require('@waves/waves-transactions')

// {
//   account: string,
//   asset_id: string
// }

// global amount
// global dapp address



const createAccount = async data => {

  const keys = {
    user_address: '3MEXjT3hfcNiweB1wF76oa8o3R9c7FboFF6',
    user_public_key: '7jMtJvxupPhs8pijnjH3EvrfQ3V6KZsWF2uYFgnbCdCR',
    user_private_key: '98kpLeeRa1g793JoS924BWYhDbDDVx2DYnV9ND4rnhLK',
    dapp: '3M4qwDomRabJKLZxuXhwfqLApQkU592nWxF',
    asset_id: 'Cd6wprgd9v4fuXxidrzCebvUX2sUgiph2CJVqkiV1nkB'
  }

  const stuff = {
    privateKey: keys.user_private_key
  }
  const iTx = invokeScript({
    dApp: keys.dapp,
    call: { function: "createAccount" },
    payment: [{ assetId: keys.asset_id, amount: 100000}],
    chainId: 82,
  }, stuff)

  const txObj = {
    amount: 800000000,
    recipient: keys.user_address,
    assetId: keys.asset_id
  }
  console.log(JSON.stringify(transfer(txObj, keys.dapp)))

  // let txTransfer = await broadcast(transfer(txObj, ))
  const test = await broadcast(iTx, 'http://localhost:6869')
}

export default createAccount