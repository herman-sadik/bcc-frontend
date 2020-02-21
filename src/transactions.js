import {nodeInteraction} from '@waves/waves-transactions'

export const init = async () => {
  global.config = {
    dappAddress: '3MGJSkBepVjABAHDgJ5QiuqWNdtEwJqaNHG',
    userAddress: '3MGZbHpw6Mttx3AxLUAJQJs2ygYgveiEfp3',
    nodeUrl: 'http://localhost:6869',
    multiplier: 10 ** 8,
    chainId: 82
  }
  global.config.assetId = await getAssetId()
}

const config = () => global.config

const getData = key => {
  return nodeInteraction.accountDataByKey(key, config().dappAddress, config().nodeUrl)
}

const getAssetId = async () => {
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

export const getDevices = async () => {
  const DEVICE_ADDRESS_LENGTH = 13

  const res = await nodeInteraction.accountData(config().dappAddress, config().nodeUrl)
  if (!res) return []
  console.log(res)
  const devices = []
  Object.keys(res).forEach(item => {
    if (item.substring(DEVICE_ADDRESS_LENGTH) === '_dev_balance') {
      const address = item.substring(0, DEVICE_ADDRESS_LENGTH)
      devices.push({
        address: address,
        balance: res[address + '_dev_balance'].value / config().multiplier,
        price: res[address + '_dev_price'].value / config().multiplier
      })
    }
  })
  console.log(devices)
  return devices
}

export const getUsers = async () => {
  const USER_ADDRESS_LENGTH = 35

  const res = await nodeInteraction.accountData(config().dappAddress, config().nodeUrl)
  if (!res) return []
  const users = []
  Object.keys(res).forEach(item => {
    if (item.substring(USER_ADDRESS_LENGTH) === '_usr_balance') {
      const address = item.substring(0, USER_ADDRESS_LENGTH)
      users.push({
        address: address,
        balance: res[address + '_usr_balance'].value / config().multiplier,
        balanceExpiration: new Date(res[address + '_usr_balance_expiration'].value)
      })
    }
  })
  return users
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
    return null
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