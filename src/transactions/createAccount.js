import {broadcast, transfer} from '@waves/waves-transactions'
const {invokeScript} = require('@waves/waves-transactions')

// {
//   account: string,
//   asset_id: string
// }

// global amount
// global dapp address



const createAccount = async data => {
  console.log(broadcast)
  const iTx = invokeScript({
    dApp: "3M7BPTZZgqa6JcXqAg7ZiDB2wuChxAxPtgx",
    call: { function: "createAccount" },
    payment: [{ assetId: null, amount: 0 }],
    chainId: 82,
  }, "cactus nice valley siren pigeon image manual script raise can crisp sniff weekend guilt glove")
  console.log(JSON.stringify(iTx))
  await broadcast(iTx, 'http://localhost:6869/')

}

export default createAccount