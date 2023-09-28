import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
import authRouter from "./routes/authRoutes";
import { userRouter } from "./routes/userRoutes";
import { accountRouter } from "./routes/accountRoutes";
import { Server, Socket } from "socket.io";
import { createServer } from "http";
import cors from "cors";

dotenv.config();

const app: Express = express();

const server = createServer(app);
app.use(cors());
const io: Server = new Server(server, {
  cors: {},
});
io.on("connection", (socket) => {
  socket.on("join_room", (room) => {
    socket.join(room);
    console.log(`User ${socket.id} joined room ${room}`);
  });

  socket.on("send_message", (data) => {
    console.log(data);
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log(`${socket.id} disconnected`);
  });
});

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

server.listen(1231, () => {
  console.log(`server api online at : http://localhost:1231`);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth/", authRouter);
app.use("/api/users/", userRouter);
app.use("/api/account/", accountRouter);
app.use(checkMongo);

app.get("/", (req: Request, res: Response) => {
  console.log("api pinged");
  if (mt == true) {
    res.status(201).send("server maintenance cuz not connected to db");
  } else {
    res.status(200).send("server running");
  }
});
