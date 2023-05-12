/*
    Payment service server
*/
import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import dummyRoutes from "./routes/dummyRoutes.js"
import paymentRoutes from "./routes/paymentRoutes.js"

//Using express
const app = express()
app.use(express.json())

//Enable environment-V
dotenv.config()
//DB connection
connectDB()

//Routing
app.use("/api/dummy", dummyRoutes)
app.use("/api/payments", paymentRoutes)

//Setting port
const PORT = process.APP_PORT || 4000
//Starting server
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT} ...`)
})
