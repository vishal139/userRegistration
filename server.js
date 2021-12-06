import express from 'express'
import mongoose from 'mongoose';
import { APP_PORT, DB_URL } from './config';
import { ErrorHandler } from './middleware';
import router from './router';

// db connection
mongoose.connect(DB_URL).then(()=>{
    console.log("connection successfull...")
})

const app = express();
app.use(express.json());
app.use(router);
app.use(ErrorHandler);
app.listen(APP_PORT, ()=>{
    console.log(`listening on port ${APP_PORT}`);
})