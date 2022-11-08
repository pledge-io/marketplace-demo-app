import axios from 'axios'
import * as dotenv from 'dotenv'
dotenv.config()

const { PLEDGE_API_KEY, PLEDGE_API_URL } = process.env

export const pledgeApi = axios.create({
  baseURL: PLEDGE_API_URL,
  headers: {
    'X-Api-Key': PLEDGE_API_KEY
  }
})
