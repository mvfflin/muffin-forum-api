import express, { Request, Response } from "express";
import { changeAvatar } from "../controllers/changeAvatar";
import { changeDesc } from "../controllers/changeDesc";

export const accountRouter = express.Router();

accountRouter.patch("/admin/change-description", changeDesc);
accountRouter.patch("/admin/change-avatar", changeAvatar);
