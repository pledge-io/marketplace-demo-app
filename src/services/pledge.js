import axios from 'axios'
import * as dotenv from 'dotenv'
dotenv.config()

const { PLEDGE_API_KEY } = process.env

export const pledgeApi = axios.create({
  headers: {
    'X-Api-Key': PLEDGE_API_KEY
  }
})