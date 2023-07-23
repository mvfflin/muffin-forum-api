import { Request, Response } from "express";
import { user } from "../schema/user";
import { compareSync } from "bcryptjs";
import * as jwt from "jsonwebtoken";

export const loginControl = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    try {
        if (!username || !password) {
            return res
                .status(201)

                .json({ error: "Incomplete credentials" });
        }

        const findUser = await user.findOne({
            username: username,
        });

        if (!findUser) {
            return res
                .status(202)

                .json({ error: "User not found" });
        } else {
            const thePass = findUser.password as string;
            const checkPass = compareSync(password, thePass);

            if (!checkPass) {
                return res.status(203).json({ error: "Incorrect password" });
            } else {
                const jwtToken = jwt.sign(
                    {
                        id: findUser.id,
                        username: findUser.username,
                        email: findUser.email,
                    },
                    process.env.JWTKEY!
                );
                return res.status(200).json({ findUser, token: jwtToken });
            }
        }
    } catch (err) {
        console.log(`smth wrong : ${err}`);
        return res.status(204).json({ error: "Unknown error." });
    }
};
