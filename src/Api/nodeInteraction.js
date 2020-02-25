import {nodeInteraction} from '@waves/waves-transactions'

export const config = {
  dappAddress: process.env.REACT_APP_dapp,
  nodeUrl: process.env.REACT_APP_nodeUrl,
  multiplier: 10 ** 8,
  chainId: process.env.REACT_APP_chainId
}

export const getData = async key => {
  const res = await nodeInteraction.accountDataByKey(key, config.dappAddress, config.nodeUrl)
  if (res) return res.value
  return null
}

export const init = async () => {
  global.assetId = await getData('asset_id')
}

const daySinceDappStart = async () => {
  const dappStart = await getData('dapp_start_date')
  const milliSecondsInOneDay = 24 * 3600 * 1000 
  return Math.floor((new Date() - dappStart) / milliSecondsInOneDay)
}

export const getDevices = async () => {
  const DEVICE_ADDRESS_LENGTH = 35

  const res = await nodeInteraction.accountData(config.dappAddress, config.nodeUrl)
  const day = await daySinceDappStart()
  if (!res) throw 'Connection error'
  const devices = []
  Object.keys(res).forEach(item => {
    if (item.substring(DEVICE_ADDRESS_LENGTH) === '_dev_balance') {
      const address = item.substring(0, DEVICE_ADDRESS_LENGTH)
      const searchString = `${address}_dev_reservation_${day}`
      devices.push({
        address: address,
        balance: res[address + '_dev_balance'].value / config.multiplier,
        price: res[address + '_dev_price'].value / config.multiplier,
        isReservedToday: !!res[searchString]
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