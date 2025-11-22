import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import router from "./routes/auth.js";


dotenv.config();

const app = express();
const port = 5000;

app.use(
  cors({
    origin: "https://rapid-resq-frontend-ecdb.vercel.app",
  })
);

app.use(express.json());

const connectdb  = async () =>{
  try{
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Mongodb is connected");
  }catch(error){
    console.log("Mongodb is not connected");
  }
}
connectdb();

app.use("/api",router);


app.listen(port, () => {
  console.log(`The server is running at port ${port}`);
});
