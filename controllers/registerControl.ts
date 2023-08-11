import { Request, Response } from "express";
import { user } from "../schema/user";
import { genSaltSync, hashSync } from "bcrypt";
import jwt from "jsonwebtoken";
import date from "date-and-time";

export const registerControl = async (req: Request, res: Response) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    if (!username || !email || !password) {
        console.log("Incomplete credentials");
        return res.status(201).json({ error: "Incomplete credentials" });
    }
    try {
        const uniqueId = parseInt(
            Math.ceil(Math.random() * Date.now())
                .toPrecision(5)
                .toString()
                .replace(".", "")
        );

        const findUser = await user.findOne({
            username: username,
        });

        const findEmail = await user.findOne({
            email: email,
        });

        const salt: string = genSaltSync(5);
        const hashPass: string = hashSync(password, salt);

        let datenow: Date = new Date();
        let formattedDate: string = date.format(datenow, "dddd, MMMM DD YYYY");

        if (findUser) {
            return res.status(202).json({ error: "Username already exists!" });
        } else if (findEmail) {
            return res.status(203).json({ error: "Email already exists!" });
        } else {
            try {
                await user.create({
                    id: uniqueId,
                    avatarUrl: "",
                    username: username,
                    email: email,
                    password: hashPass,
                    desc: "",
                    registered: formattedDate,
                    badges: [
                        {
                            badgename: "Member",
                            badgedesc: "A default badge for a member",
                        },
                    ],
                });
                console.log(
                    `New user registered successfully!\nUsername: ${username}\nEmail: ${email}\nRegistered at : ${formattedDate}`
                );
                const jwtToken = jwt.sign(
                    {
                        id: uniqueId,
                        username: username,
                        email: email,
                    },
                    process.env.JWTKEY!
                );
                return res.status(200).json({
                    id: uniqueId,
                    username: username,
                    email: email,
                    token: jwtToken,
                });
            } catch (err) {
                console.log(`Something is wrong, check the error : ${err}`);
                return res.status(204).json({ error: "Unknown error." });
            }
        }
    } catch (err) {
        console.log(`Something is wrong, check the error : ${err}`);
        console.log(err);
        return res.status(204).json({ error: "Unknown error" });
    }
};
