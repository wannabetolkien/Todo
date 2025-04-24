import express from "express";


import connectDB from './Server/dbConnection.js';
import apiRouter from "./routes/apiRouter.js";

const app=express();
const PORT=3000;

app.use(express.json());
app.use("/api",apiRouter);

connectDB();

app.listen(PORT,()=>{
    console.log(`Working on ${PORT}`);
});