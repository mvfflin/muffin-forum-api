import express, { Request, Response } from "express";
import { changeDesc } from "../controllers/changeDesc";

export const accountRouter = express.Router();

accountRouter.patch("/admin/:id/changedescription", changeDesc);
