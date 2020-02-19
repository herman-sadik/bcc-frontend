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
    dapp: '3M7BPTZZgqa6JcXqAg7ZiDB2wuChxAxPtgx',
    asset_id: 'Gci8aULLGc97RMu3WAHombcERuTER3NV54YSrNjgdEW2'
  }

  const stuff = {
    privateKey: '98kpLeeRa1g793JoS924BWYhDbDDVx2DYnV9ND4rnhLK'
  }
  const iTx = invokeScript({
    dApp: "3M7BPTZZgqa6JcXqAg7ZiDB2wuChxAxPtgx",
    call: { function: "createAccount" },
    payment: [{ assetId: 'Gci8aULLGc97RMu3WAHombcERuTER3NV54YSrNjgdEW2', amount: 10 }],
    chainId: 82,
  }, stuff)

  const txObj = {
    amount: 800000000,
    recipient: '3MEXjT3hfcNiweB1wF76oa8o3R9c7FboFF6',
    assetId: 'Gci8aULLGc97RMu3WAHombcERuTER3NV54YSrNjgdEW2'
  }
  console.log(JSON.stringify(transfer(txObj, '3M7BPTZZgqa6JcXqAg7ZiDB2wuChxAxPtgx')))

  // let txTransfer = await broadcast(transfer(txObj, ))
  const test = await broadcast(iTx, 'http://localhost:6869')
}

export default createAccount