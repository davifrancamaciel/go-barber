import axios from 'axios'

// Adaptador Ethernet Ethernet 4:
// Endereço IPv4. . . . . . . .  . . . . . . . : 192.168.1.67
const api = axios.create({
  baseURL: "http://192.168.42.142:3399"
})

export default api
