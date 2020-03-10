import Axios from 'axios'

const apiUrl = process.env.REACT_APP_backendUrl
console.log(apiUrl)

export default class Api {

  static axios = () => {
    return Axios.create({
      baseURL: apiUrl,
      timeout: 10000,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-type': 'application/json',
      }
    })
  }

  static request = async (method, url, payload) => {
    let response = null
    const setResponse = _response => {response = _response}
    try {
      await this.axios()[method](url, payload).then(res => {
        console.log(res)
        setResponse(res)
      }).catch(err => {
        console.log(err)
        setResponse({status: err.response.status, data: err.response.data})
      })
      return {code: response.status, data: response.data}
    }
    catch {
      return {code: 0, data: null}
    }
  }

  static requestwithHandlers = async (method, url, payload) => {
    const res = await this.request(method, url, payload)
    switch (res.code) {
      case 401:
        this.unauthorizedHandler()
        break
      case 0:
        this.noConnectionHandler()
        break
      case 500:
        this.serverError()
        break
      default:
        return res
    }
  }

  static unauthorizedHandler = () => {
    console.error('Got 401')
  }

  static noConnectionHandler = () => {
    console.error('Connection error')
  }

  static serverError = () => {
    console.error('Got 500')
  }

  static get = async (url, payload) => this.requestwithHandlers('get', url, payload)
  static post = async (url, payload) => this.requestwithHandlers('post', url, payload)
  static delete = async (url, payload) => this.requestwithHandlers('delete', url, payload)
  static patch = async (url, payload) => this.requestwithHandlers('patch', url, payload)
  static put = async (url, payload) => this.requestwithHandlers('put', url, payload)

}
