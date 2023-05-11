/*
    DB Connection
    Using MongoDB and Mongoose
*/
import mongoose from "mongoose"
import dotenv from "dotenv"

const connectDB = async() => {
    //Enable environment-V
    dotenv.config()
    try {
        //Connect to mongo node
        const connection = await mongoose.connect(process.env.DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        const url = `${connection.connection.host}:${connection.connection.port}`
        console.log(`Connected to MongoDB in: ${url}`);
    } catch (error) {
        console.log(`error: ${error.message}`)
        process.exit(1)
    }
}

export default connectDB