import cryptoRandomString from 'crypto-random-string'

export const config = {
  dappAddress: process.env.REACT_APP_dapp,
  nodeUrl: process.env.REACT_APP_nodeUrl,
  multiplier: 10 ** 8,
  chainId: process.env.REACT_APP_chainId
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

  const deviceName = cryptoRandomString({length: 35, type: 'url-safe'})

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