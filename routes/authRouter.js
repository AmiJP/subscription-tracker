import { Router } from "express";
import { SignIn, SignOut, Signup } from "../Controller/auth.controller.js";

const authRouter = Router();

authRouter.post("/sign-up", Signup)

authRouter.post("/sign-in", SignIn)

authRouter.post("/sign-out", SignOut)

export default authRouter