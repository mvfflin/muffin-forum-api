import { Request, Response } from "express";
import { user } from "../schema/user";

export const changeAvatar = async (req: Request, res: Response) => {
    const { id, base64 } = req.body;

    if (!base64)
        return res.status(201).json({ error: "No image file attached" });
    try {
        await user.findOneAndUpdate(
            {
                id: id,
            },
            {
                $set: {
                    avatarUrl: base64,
                },
            }
        );
        return res.status(200).json({ error: "Avatar successfully changed!" });
    } catch (e) {
        console.log(e);
        return res
            .status(202)
            .json({ error: "Something wrong, please dm mvfflin!" });
    }
};
