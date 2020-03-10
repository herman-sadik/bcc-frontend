import Api from './backend'

export const createFaucet = async address => {
  if (!address) throw new Error('Address not given')

  const body = {
    data: {
      type: 'faucet',
      attributes: {
        address: address
      }
    }
  }
  const res = await Api.post('/faucets', body)
  console.log(res)
}

export const createDevice = async address => {
  if (!address) throw new Error('Address not given')

  const body = {
    data: {
      type: 'device',
      attributes: {
        owner_address: address
      }
    }
  }
  const res = await Api.post('/devices', body)
  console.log(res)
}