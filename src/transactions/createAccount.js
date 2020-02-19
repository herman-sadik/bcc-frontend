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
    payment: [{ assetId: null, amount: 10 }]
  }, "favorite often like wheel doctor leisure arch share oxygen hobby fantasy sad require embrace man")
  console.log(JSON.stringify(iTx))
  const test = await broadcast(iTx)

}

export default createAccount