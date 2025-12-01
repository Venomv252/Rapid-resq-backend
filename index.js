import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import router from "./routes/auth.js";
import Sensordata_route from "./routes/sensor-data.js";


dotenv.config();

const app = express();
const port = 5000;

app.use(
  cors({
    origin: ["https://rapid-res-frontend-00.vercel.app",
              "http://localhost:3000",
              "http://localhost:5173"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"]
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


//signup route
app.use("/api",router);

//sensor data route
app.use("/api",Sensordata_route);



app.listen(port, () => {
  console.log(`The server is running at port ${port}`);
});
