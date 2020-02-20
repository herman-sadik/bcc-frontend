import {broadcast, waitForTx} from '@waves/waves-transactions'
const {invokeScript} = require('@waves/waves-transactions')

const nodeUrl = 'http://localhost:6869'
const multiplier = 10 ** 8
const chainId = 82
const dappAddress = '3MPgKkfBngNg3kog5a9Y3zMbAt8GsVfa2zK'

export const createAccount = async data => {

  // {
  //   assetId: String,
  //   userPrivateKey: String
  // }

  const iTx = invokeScript({
    dApp: dappAddress,
    call: { function: "createAccount" },
    payment: [{ assetId: "63dfCSFSuwM4NrP7pgTuuaNv2vRA6sWUrevxKXJkBE14", amount: 10 * multiplier }],
    chainId: chainId,
  }, {privateKey: 'BEjRFEyr7FEtjGqbUGnKvqEpM3SuixMHDVE98hNeNvyZ'})

  await broadcast(iTx, nodeUrl)
  await waitForTx(iTx.id)
  console.log(iTx)
}
