import { Router } from "express";
import { getUser, getUsers } from "../Controller/user.controller.js";
import { authorize } from "../middleware/auth.middleware.js";

const userRouter = Router();

userRouter.get("/" , getUsers)

userRouter.get("/:id" , authorize, getUser)

userRouter.post("/", (req, res) => {
    req.send({message : "Create user"})
})

userRouter.put("/:id", (req, res) => {
    req.send({message : "Update user"})
})

userRouter.delete("/:id", (req, res) => {
    req.send({message : "Delete user"})
})

export default userRouter