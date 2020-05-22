import axios from 'axios'

const api = axios.create({
  baseURL: "http://192.168.99.100:3399"
})

export default api
