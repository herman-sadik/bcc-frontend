import {broadcast, waitForTx} from '@waves/waves-transactions'
const {invokeScript} = require('@waves/waves-transactions')

const nodeUrl = 'http://localhost:6869'
const multiplier = 10 ** 8
const chainId = 82
const dappAddress = '3MHJRtZ67WrDPdmoKx2MX2DwEmbQtmuEjrt'

export const createAccount = async data => {

  // {
  //   assetId: String,
  //   userPrivateKey: String
  // }

  const iTx = invokeScript({
    dApp: dappAddress,
    call: { function: "createAccount" },
    payment: [{ assetId: data.assetId, amount: 10 * multiplier }],
    chainId: chainId,
  }, {privateKey: data.userPrivateKey})

  await broadcast(iTx, nodeUrl)
  await waitForTx(iTx.id)
  console.log(iTx)
}
