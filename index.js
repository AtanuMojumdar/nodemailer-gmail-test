const express = require('express')
require('dotenv').config();
const mailRouter = require('./router/mailRouter.js')

const PORT = process.env.PORT || 8000;
const app = express()

app.use(express.json())

app.get('/',(req,res)=>{
    return res.send("Server Ok")
})

app.use('/mail',mailRouter);

app.listen(PORT,()=>{
    console.log(`Listening on http://localhost:${PORT}`)
})