require("dotenv").config({ path: "./.env.local" });
import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
import authRouter from "./routes/authRoutes";
import { userRouter } from "./routes/userRoutes";
import { accountRouter } from "./routes/accountRoutes";
import cors from "cors";

const app: Express = express();

var mt: boolean = false;

var mongodb: string = process.env.MONGODB!;

async function checkMongo() {
    try {
        await mongoose.connect(mongodb, {
            dbName: "muffinforum",
        });
        console.log("connected to db");
        mt = false;
    } catch (err) {
        console.log("database not connected");
        console.log("the error : " + err);
        mt = true;
    }
}
checkMongo();
setTimeout(checkMongo, 10000);

app.listen(1231, () => {
    console.log(`server api online at : http://localhost:1231`);
});

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth/", authRouter);
app.use("/api/users/", userRouter);
app.use("/api/account/", accountRouter);

app.get("/", (req: Request, res: Response) => {
    console.log("api pinged");
    if (mt == true) {
        res.status(201).send("server maintenance cuz not connected to db");
    } else {
        res.status(200).send("server running");
    }
});
