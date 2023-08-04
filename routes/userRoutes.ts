import express, { Request, Response } from "express";
import { user } from "../schema/user";

export const userRouter = express.Router();

userRouter.get("/user", async (req: Request, res: Response) => {
    const { username, id } = req.query;
    console.log(username, id);

    try {
        const findId = await user.findOne({
            id: id,
        });
        const findUsername = await user.findOne({
            username: username,
        });

        if (!findUsername && !findId) {
            return res.status(201).json({ error: "Can't find that user." });
        } else {
            return res.status(200).json(findUsername || findId);
        }
    } catch (e: unknown) {
        console.log(e);
        return res.status(202).json({ error: "Unknown error." });
    }
});

userRouter.get("/", async (req: Request, res: Response) => {
    const findUsers = await user.find();

    if (findUsers.length == 0) {
        return res.status(201);
    }
    return res.status(200).json(findUsers);
});
