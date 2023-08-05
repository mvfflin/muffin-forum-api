import { Request, Response } from "express";
import { user } from "../schema/user";

export const changeDesc = async (req: Request, res: Response) => {
    const { description, id } = req.body;
    console.log("pinged");

    if (!description || description == "") {
        return res.status(201).json({ error: "Description cant be empty" });
    } else {
        await user.findOneAndUpdate(
            { id: id },
            {
                $set: {
                    desc: description,
                },
            }
        );
        return res
            .status(200)
            .json({ error: "Description set to : " + description });
    }
};
