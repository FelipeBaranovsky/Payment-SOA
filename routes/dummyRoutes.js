/*
    Dummy Endpoints
*/
import express from "express"

//Create Router
const router = express.Router()

//Endpoints assignment
//List and Register
router.get("/", (req,res) => {
    res.json({msg: "Hi! Im dummy"})
})

export default router