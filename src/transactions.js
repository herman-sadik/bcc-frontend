import {nodeInteraction} from '@waves/waves-transactions'

export const init = async () => {
  global.config = {
    dappAddress: '3MAbF6eWgBXLSKSTSc5G1T175fAAY3ZoLGs',
    userAddress: '3M5rWpEpRFQSfDTHnttvYHj27vm7UtuuPUJ',
    nodeUrl: 'http://localhost:6869',
    multiplier: 10 ** 8,
    chainId: 82,
  }
  global.config.assetId = await getAssetId()
}

const getData = key => {
  return nodeInteraction.accountDataByKey(key, global.config.dappAddress, global.config.nodeUrl)
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

export const currentUser = async () => {
  const res = await nodeInteraction.accountData(global.config.dappAddress, global.config.nodeUrl)
  if (!res) {
    console.error('User not found')
    return
  }
  const balance = res[global.config.userAddress + '_usr_balance'].value
  const balanceExpiration = res[global.config.userAddress + '_usr_balance_expiration'].value
  return {
    address: global.config.userAddress,
    balance: balance,
    balanceExpiration: new Date(balanceExpiration)
  }
}

export const createAccount = () => {
  return invoke({
    data: {
      dApp: global.config.dappAddress,
      call: {function: 'createAccount', args: []},
      payment: [{ assetId: global.config.assetId, amount: 10 * global.config.multiplier }],
      chainId: global.config.chainId,
  }})
}

export const deposit = amount => {
  if (!amount) {
    console.error('Provide amount as an argument')
    return
  }
  return invoke({
    data: {
      dApp: global.config.dappAddress,
      call: {function: 'deposit', args: []},
      payment: [{ assetId: global.config.assetId, amount: 25 * global.config.multiplier }],
      chainId: global.config.chainId
  }})
}

export const createDevice = () => {
  return invoke({
    data: {
      dApp: global.config.dappAddress,
      call: {
        function: 'createDevice',
        args: [
          {type: 'string', value: 'hello there'},
          {type: 'integer', value: global.config.multiplier}
        ]
      },
      payment: [],
      chainId: global.config.chainId
  }})
}
