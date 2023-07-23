import express, { Request, Response } from "express";
import { user } from "../schema/user";

export const userRouter = express.Router();

userRouter.post(
  "/getusername/:username",
  async (req: Request, res: Response) => {
    const { username } = req.params;

    try {
      const findUser = await user.findOne({
        username: username,
      });
      if (!findUser) {
        return res.status(201).json({ error: "Can't find that user." });
      } else {
        return res.status(200).json(findUser);
      }
    } catch (e: unknown) {
      console.log(e);
      return res.status(202).json({ error: "Unknown error." });
    }
  }
);

userRouter.post("/getid/:id", async (req: Request, res: Response) => {
  const idparam = req.params.id;

  try {
    const findUser = await user.findOne({
      id: idparam,
    });

    if (!findUser) {
      return res
        .status(201)
        .send("User not found")
        .json({ error: "User not found" });
    } else {
      return res.status(200).json(findUser);
    }
  } catch (e: unknown) {
    console.log(e);
    return res.status(203).json({ error: "Something's wrong" });
  }
});

userRouter.post("/", async (req: Request, res: Response) => {
  const findUsers = await user.find();

  if (findUsers.length == 0) {
    return res.status(201);
  }
  return res.status(200).json(findUsers);
});
