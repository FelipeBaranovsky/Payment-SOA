/*
    Endpoints orchestrator
*/
import express from "express"
import { getPayments, newPayment, getPayment, updatePayment, deletePayment, getStatus } from "../controllers/paymentController.js"

//Create Router
const router = express.Router()

//Endpoints assignment
//List and Register
router.route("/").get(getPayments).post(newPayment) 
//Get, Update, Delete
router.route("/:id").get(getPayment).put(updatePayment).delete(deletePayment)
//Get Status
router.get("/status/:order", getStatus)

export default router