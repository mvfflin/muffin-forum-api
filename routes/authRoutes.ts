import express, { Express, Request, Response } from "express";
import { registerControl } from "../controllers/registerControl";
import { loginControl } from "../controllers/loginControl";

const authRouter = express.Router();

authRouter.post("/register", registerControl);
authRouter.post("/login", loginControl);

export default authRouter;
