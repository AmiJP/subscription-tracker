import { Router } from "express";
import { createSubscription, getSubscriptions, getUserSubscription, getUserSubscriptions } from "../Controller/subscription.controller.js";
import { authorize } from "../middleware/auth.middleware.js";

const subScriptionRouter = Router();

subScriptionRouter.get("/" , getSubscriptions)

subScriptionRouter.get("/:id" , authorize, getUserSubscription)

subScriptionRouter.post("/",authorize, createSubscription)

subScriptionRouter.put("/:id", (req, res) => {
    req.send({title : "Update subscription"})
})

subScriptionRouter.delete("/:id", (req, res) => {
    req.send({title : "Delete subscription"})
})

subScriptionRouter.get("/user/:id" ,authorize, getUserSubscriptions)

subScriptionRouter.put(":/id/cancel", (req, res) => {
    req.send({title : "cancel subscription"})
})

subScriptionRouter.get("/renewel", (req, res) => {
    req.send({title : "Upcoming renewel subscription"})
})

export default subScriptionRouter