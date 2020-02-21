import {nodeInteraction} from '@waves/waves-transactions'

export const init = async () => {
  global.config = {
    dappAddress: '3MGJSkBepVjABAHDgJ5QiuqWNdtEwJqaNHG',
    userAddress: '3MGZbHpw6Mttx3AxLUAJQJs2ygYgveiEfp3',
    nodeUrl: 'http://localhost:6869',
    multiplier: 10 ** 8,
    chainId: 82,
  }
  global.config.assetId = await getAssetId()
}

const config = () => global.config

const getData = key => {
  return nodeInteraction.accountDataByKey(key, config().dappAddress, config().nodeUrl)
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

  const account = await nodeInteraction.accountData(config().dappAddress, config().nodeUrl)
  const bccBalance = await nodeInteraction.assetBalance(config().assetId, config().userAddress, config().nodeUrl)
  const wavesBalance = await nodeInteraction.balance(config().userAddress, config().nodeUrl)

  const countBalance = balance => (balance / config().multiplier)

  if (Object.keys(account).length === 0 || !bccBalance || !wavesBalance)
    throw 'Connection Error'

  let deposit = account[config().userAddress + '_usr_balance']
  if (deposit) deposit = countBalance(deposit.value)
  else deposit = null

  let depositExpiration = account[config().userAddress + '_usr_balance_expiration']
  if (depositExpiration) depositExpiration = new Date(depositExpiration.value)
  else depositExpiration = null

  return {
    address: config().userAddress,
    hasAccount: !(!deposit || !depositExpiration),
    bccBalance: bccBalance ? countBalance(bccBalance) : null,
    wavesBalance: wavesBalance ? countBalance(wavesBalance) : null,
    deposit: deposit,
    depositExpiration: depositExpiration
  }
}

export const createAccount = () => {
  return invoke({
    data: {
      dApp: config().dappAddress,
      call: {function: 'createAccount', args: []},
      payment: [{ assetId: config().assetId, amount: 10 * config().multiplier }],
      chainId: config().chainId,
  }})
}

export const deposit = amount => {
  if (!amount) {
    console.error('Provide amount as an argument')
    return
  }
  return invoke({
    data: {
      dApp: config().dappAddress,
      call: {function: 'deposit', args: []},
      payment: [{ assetId: config().assetId, amount: 25 * config().multiplier }],
      chainId: config().chainId
  }})
}

export const createDevice = () => {

  const deviceName = Math.random().toString(16).substring(2)

  return invoke({
    data: {
      dApp: config().dappAddress,
      call: {
        function: 'createDevice',
        args: [
          {type: 'string', value: deviceName},
          {type: 'integer', value: config().multiplier}
        ]
      },
      payment: [],
      chainId: config().chainId
  }})
}
