/*
    Payment Model and its attributes
*/
import mongoose from "mongoose"

//Payment Model
const paymentSchema = mongoose.Schema({
    //Payment Status
    state: {
        type: String,
        required: true,
        enum: ["Created", "Authorized", "Rejected"]
    },
    //Order ID
    order: {
        type: Number,
        required: true,
        unique: true
    },
    //Payment Amount
    amount: {
        type: Number,
        required: true
    },
    //Card Type
    creditCardType: {
        type: String,
        required: true,
        enum: ["Visa", "MasterCard"]
    },
    //Type of Currency
    coin: {
        type: String,
        required: true,
        enum: ["ARS", "USD", "EUR", "BOV", "CLP", "COP", "YEN", "MXN", "PYG", "PEN", "UYU", "RUB", "INR", "CNY", "BRL", "GBP"]
    }
}, {
    timestamps: true,
})

//Deploy model
const Payment = mongoose.model("Payment", paymentSchema)


export default Payment