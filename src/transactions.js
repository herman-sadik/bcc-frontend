import {nodeInteraction} from '@waves/waves-transactions'

const nodeUrl = 'http://localhost:6869'
const multiplier = 10 ** 8
const chainId = 82
const dappAddress = '3M4sJHV71NzWpFWKpUU5ki62Pqu3PCPbxiZ' 
const assetId = '44MoU2AW1J497TCSjXqRbAjWHARrbn2NgGccJ5eWLC65'

const getData = key => {
  return nodeInteraction.accountDataByKey(key, dappAddress, nodeUrl)
}

export const getAssetId = async () => {
  const res = await getData('asset_id')
  if (res) return res.value
  return null
}

const invoke = tx => {
  tx.type = 16
  tx.data.fee = {
    tokens: '0.005',
    assetId: 'WAVES'
  }
  return tx
}

export const getUsers = async () => {
  const res = await getData('asset_id').value
}

export const createAccount = () => {
  return invoke({
    data: {
      dApp: dappAddress,
      call: {function: 'createAccount', args: []},
      payment: [{ assetId: assetId, amount: 10 * multiplier }],
      chainId: chainId,
  }})
}

export const deposit = () => {
  return invoke({
    data: {
      dApp: dappAddress,
      call: {function: 'deposit', args: []},
      payment: [{ assetId: assetId, amount: 25 * multiplier }],
      chainId: chainId
  }})
}

export const createDevice = () => {
  return invoke({
    data: {
      dApp: dappAddress,
      call: {
        function: 'createDevice',
        args: [
          {type: 'string', value: 'hello there'},
          {type: 'integer', value: multiplier}
        ]
      },
      payment: [],
      chainId: chainId
  }})
}
