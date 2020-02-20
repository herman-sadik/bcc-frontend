import {broadcast, waitForTx, nodeInteraction} from '@waves/waves-transactions'
const {invokeScript} = require('@waves/waves-transactions')

const nodeUrl = 'http://localhost:6869'
const multiplier = 10 ** 8
const chainId = 82
const dappAddress = '3MNhntdoSd9btJxKzbFytt3CF85JuminoKe'
const assetId = 'AMxocLehhNMrvY9AzMpeBuPNBknKBX4KtMW5D3YBJH6C'
const privateKey = '6wExKRKNJDnE3DH2iGJUZ63vkpVckQANtApTkoA8jFbi'

const getData = key => {
  return nodeInteraction.accountDataByKey(key, dappAddress, nodeUrl)
}

const invoke = tx => {
  tx.type = 16
  tx.fee = {
    tokens: '0.005',
    assetId: 'WAVES'
  }
}

export const createAccount = async () => {
  const tx = invokeScript({
    dApp: dappAddress,
    call: {function: 'createAccount'},
    payment: [{ assetId: assetId, amount: 10 * multiplier }],
    chainId: chainId,
  }, {privateKey: privateKey})

  await broadcast(tx, nodeUrl)
  await waitForTx(tx.id)
  console.log(tx)
}

export const getUsers = async () => {
  const res = await getData('asset_id')
  console.log(res)
}

export const deposit = async amount => {
  if (!amount) {
    console.error('Provide amount of tokens as an argument')
    return
  }
  const tx = invokeScript({
    dApp: dappAddress,
    call: {function: 'deposit'},
    payment: [{ assetId: assetId, amount: amount * multiplier }],
    chainId: chainId
  }, {privateKey: privateKey})
  console.log(tx)
  await broadcast(tx, nodeUrl)
}

export const createDevice = async () => {
  const tx = invokeScript({
    dApp: dappAddress,
    call: {
      function: 'createDevice',
      args: [
        {type: 'string', value: 'hello there'},
        {type: 'integer', value: multiplier}
      ]
    },
    chainId: chainId
  }, {privateKey: privateKey})
  await broadcast(tx, nodeUrl)
  console.log(tx)
}
