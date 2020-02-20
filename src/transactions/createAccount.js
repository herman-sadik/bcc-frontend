import {broadcast, waitForTx} from '@waves/waves-transactions'
const {invokeScript} = require('@waves/waves-transactions')

const nodeUrl = 'http://localhost:6869'
const multiplier = 10 ** 8
const chainId = 82
const dappAddress = '3MFZUNgg6FZgBtkusHTwMLuqPy829uJxLGe'

export const createAccount = async data => {

  // {
  //   assetId: String,
  //   userPrivateKey: String
  // }

  const iTx = invokeScript({
    dApp: dappAddress,
    call: { function: "createAccount" },
    payment: [{ assetId: "BMmVyWisTfk4aLCVSm3iAzjjBLVAHtqQcUWREMXm3Zj7", amount: 10 * multiplier }],
    chainId: chainId,
  }, {privateKey: '6wExKRKNJDnE3DH2iGJUZ63vkpVckQANtApTkoA8jFbi'})

  await broadcast(iTx, nodeUrl)
  await waitForTx(iTx.id)
  console.log(iTx)
}
