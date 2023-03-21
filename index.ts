import * as express from 'express'
import dotenv from 'dotenv'
import { AddressInfo } from 'net'
import { router } from './Routes/router'
import cors from "cors"
import multer from 'multer'
dotenv.config()
const app = express.default()
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log(file)
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix+ '-' +file.originalname )
    }
})

app.use(express.json())
const upload = multer({ storage: storage })
app.use(express.static('public'))
app.use(router)
app.use(cors())
app.post('/file', upload.single('file'),(req,res)=>{
    res.send("File uploaded")
})
app.get('*', (req, res) => {
    res.status(404).send("Page Not Found")
})
const server = app.listen(process.env.PORT, () => {
    const { port, address, family } = server.address() as AddressInfo
    console.log('server listening on port', address, port, family)
})

