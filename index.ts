import * as express from 'express'
import dotenv from 'dotenv'
import { AddressInfo } from 'net'
import { router } from './router'
import cors from "cors"
dotenv.config()
const app = express.default()
app.use(router)
app.use(cors())
const server = app.listen(process.env.PORT,()=>{
 const {port,address,family} = server.address() as AddressInfo
 console.log('server listening on port', address,port,family)
})

