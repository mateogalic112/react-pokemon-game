import axios from 'axios'
import apiConfig from '../config/api'

const api = axios.create({
  baseURL: apiConfig.baseURL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
})

export default api
