/*
    Payment Controller / Endpoints
*/
import Payment from "../models/Payment.js"

//Payments list
const getPayments = async(req,res) => {
    try {
        const payments = await Payment.find()
        res.json(payments)
    } catch (error) {
        res.json({error: error.message})
    }

}

//Create a new payment
const newPayment = async(req,res) => {

    //Order already exists
    const {order} = req.body;
    const existingOrder = await Payment.findOne({order})
    if(existingOrder) {
        const error = new Error(`Order already registered`);
        return res.status(400).json({msg: error.message});
    }

    try {
        const payment = new Payment(req.body)

        payment.state = "Created"

        const savedPayment = await payment.save()
        res.json(savedPayment)

        //Change status after 1m
        setTimeout(async () => {
            await changeStatus(savedPayment)
        }, 60000)

    } catch (error) {
        res.json({error: error.message})
    }

}

const changeStatus = async(payment) => {

    const newState = Math.random() < 0.5 ? "Authorized" : "Rejected"

    payment.state = newState

    try {
        const updatedPayment = await payment.save()
        console.log("Payment Updated! \n", updatePayment);
        //TODO: Endpoint of the other group to alert the change of state
    } catch (error) {
        res.json({error: error.message})
    }

}

//Get a payment
const getPayment = async(req,res) => {
    const {id} = req.params 

    try {
        const payment = await Payment.findById(id)

        //Not Found
        if(!payment){
            const error = new Error(`Payment not found`)
            return res.status(404).json({msg: error.message})
        }

        res.json(payment)
    } catch (error) {
        res.json({error: error.message})
    }
    
}

//Update a payment
const updatePayment = async(req,res) => {
    
    try {
        const {id} = req.params
        const payment = await Payment.findById(id)
        
        //Not Found
        if(!payment){
            const error = new Error(`Payment not found`)
            return res.status(404).json({msg: error.message})
        }

        //Update only changed data
        payment.state = req.body.state || payment.state
        payment.order = req.body.order || payment.order
        payment.amount = req.body.amount || payment.amount
        payment.creditCardType = req.body.creditCardType || payment.creditCardType
        payment.coin = req.body.coin || payment.coin
        const savedPayment = await payment.save()
        res.json(savedPayment)
    } catch (error) {
        res.json({error: error.message})
    }

}

//Delete a payment
const deletePayment = async(req,res) => {
    
    try {
        const {id} = req.params
        const payment = await Payment.findById(id)
        
        //Not Found
        if(!payment){
            const error = new Error(`Payment not found`)
            return res.status(404).json({msg: error.message})
        }

        await payment.deleteOne()
        res.json({msg: "Payment removed"})
    } catch (error) {
        res.json({error: error.message})
    }
}

//Get Payment Status
const getStatus = async (req,res) => {

    try {
        const {order} = req.params
        const payment = await Payment.findOne({order}).select("-coin -creditCardType -amount -order -createdAt -updatedAt -_id -__v")
        
        //Not Found
        if(!payment){
            const error = new Error(`Payment not found`)
            return res.status(404).json({msg: error.message})
        }
        res.json(payment)
    } catch (error) {
        res.json({error: error.message})
    }
}

export {
    getPayments,
    newPayment,
    getPayment,
    updatePayment,
    deletePayment,
    getStatus
}
