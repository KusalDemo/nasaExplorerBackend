import express from 'express'
import dotenv from 'dotenv'
import * as mongoose from "mongoose";
import {authenticateToken} from "./routes/user-routes";
import customerRouter from "./routes/user-routes";

const app = express();
dotenv.config();

app.use(express.json());

const cors = require('cors')
app.use(cors())


const port = process.env.PORT || 3001


mongoose
    .connect(process.env.MONGO_URI as string)
    .then(()=>{
        console.log(`Connected to DB`);
    })
    .catch((err)=>{
        console.log(err);
    })

app.use("/api/user",customerRouter);

app.use(authenticateToken);


app.listen(port,()=>{
    console.log(`Server is up and running on port : ${port}`)
})

