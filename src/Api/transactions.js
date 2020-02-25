import {nodeInteraction} from '@waves/waves-transactions'
import cryptoRandomString from 'crypto-random-string'

export const config = {
  dappAddress: process.env.REACT_APP_dapp,
  nodeUrl: process.env.REACT_APP_nodeUrl,
  multiplier: 10 ** 8,
  chainId: process.env.REACT_APP_chainId
}

export const getAssetId = async () => {
  const res = await nodeInteraction.accountDataByKey('asset_id', config.dappAddress, config.nodeUrl)
  if (res) return res.value
  return null
}

export const init = async () => {
  global.assetId = await getAssetId()
}

const invoke = tx => {
  tx.type = 16
  tx.data.dApp = config.dappAddress
  tx.chainId = config.chainId
  tx.data.fee = {
    tokens: '0.005',
    assetId: 'WAVES'
  }
  return tx
}

export const getDevices = async () => {
  const DEVICE_ADDRESS_LENGTH = 35

  const res = await nodeInteraction.accountData(config.dappAddress, config.nodeUrl)
  if (!res) throw 'Connection error'
  const devices = []
  Object.keys(res).forEach(item => {
    if (item.substring(DEVICE_ADDRESS_LENGTH) === '_dev_balance') {
      const address = item.substring(0, DEVICE_ADDRESS_LENGTH)
      devices.push({
        address: address,
        balance: res[address + '_dev_balance'].value / config.multiplier,
        price: res[address + '_dev_price'].value / config.multiplier
      })
    }
  })
  return devices
}

export const getUsers = async () => {
  const USER_ADDRESS_LENGTH = 35

  const res = await nodeInteraction.accountData(config.dappAddress, config.nodeUrl)
  if (!res) return []
  const users = []
  Object.keys(res).forEach(item => {
    if (item.substring(USER_ADDRESS_LENGTH) === '_usr_balance') {
      const address = item.substring(0, USER_ADDRESS_LENGTH)
      users.push({
        address: address,
        balance: res[address + '_usr_balance'].value / config.multiplier,
        balanceExpiration: new Date(res[address + '_usr_balance_expiration'].value)
      })
    }
  })
  return users
}

export const currentUser = async address => {

  let account, bccBalance, wavesBalance
  try {
    account = await nodeInteraction.accountData(config.dappAddress, config.nodeUrl)
    bccBalance = await nodeInteraction.assetBalance(global.assetId, address, config.nodeUrl)
    wavesBalance = await nodeInteraction.balance(address, config.nodeUrl)
  }
  catch {
    throw 'Connection Error'
  }

  const countBalance = balance => (balance / config.multiplier)

  if (Object.keys(account).length === 0 || !bccBalance || !wavesBalance)
    throw 'Connection Error'

  let deposit = account[address + '_usr_balance']
  if (deposit) deposit = countBalance(deposit.value)
  else deposit = null

  let depositExpiration = account[address + '_usr_balance_expiration']
  if (depositExpiration) depositExpiration = new Date(depositExpiration.value)
  else depositExpiration = null

  return {
    address: address,
    hasAccount: deposit !== null,
    bccBalance: bccBalance ? countBalance(bccBalance) : null,
    wavesBalance: wavesBalance ? countBalance(wavesBalance) : null,
    deposit: deposit,
    depositExpiration: depositExpiration
  }
}

export const createAccount = () => {
  return invoke({
    data: {
      call: {function: 'createAccount', args: []},
      payment: [{ assetId: global.assetId, amount: 10 * config.multiplier }],
  }})
}

export const deposit = amount => {
  if (!amount) {
    console.error('Provide amount as an argument')
    return null
  }
  return invoke({
    data: {
      call: {function: 'deposit', args: []},
      payment: [{ assetId: global.assetId, amount: amount * config.multiplier }],
  }})
}

export const createDevice = price => {

  const deviceName = cryptoRandomString({length: 35, type: 'base64'})

  return invoke({
    data: {
      call: {
        function: 'createDevice',
        args: [
          {type: 'string', value: deviceName},
          {type: 'integer', value: (price ? price : 1) * config.multiplier}
        ]
      },
      payment: [],
  }})
}

export const makeReservation = (device, date) => {

  const dateInteger = date.getTime()
  console.log(dateInteger, device)

  return invoke({
    data: {
      call: {
        function: 'reserve',
        args: [
          {type: 'string', value: device},
          {type: 'integer', value: dateInteger}
        ]
      },
      payment: [],
    },
  })
}