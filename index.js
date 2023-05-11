/*
    Payment service server
*/
import express from "express"
import dotenv from "dotenv"

import connectDB from "./config/db.js"

//Using express
const app = express()

//Enable environment-V
dotenv.config()
//DB connection
connectDB()

//Setting port
const PORT = process.APP_PORT || 4000
//Starting server
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT} ...`)
})
