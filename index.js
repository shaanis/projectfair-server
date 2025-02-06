// steps to define express server
//  load .env file contents in to process.env
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router = require('./routes/router')
require('./database/dbConnection')

const pfServer = express()
pfServer.use(cors())
pfServer.use(express.json())
pfServer.use(router)
pfServer.use('/uploads',express.static('./uploads'))


const PORT = 3000 || process.env.PORT   // process.env.PORT   use after deployment

pfServer.listen(PORT,()=>{
    console.log(`pfserver running in port : ${PORT} and waiting for client request`);
})
pfServer.get('/',(req, res)=>{
    res.status(200).send("<h3>pfserver running and waiting for client request</h3>")
})

pfServer.post('/',(req,res)=>{
    res.status(200).send('send post request')
    
    
})