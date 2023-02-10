import express from 'express';
import bodyParser from 'body-parser';// body parser is required to parse the json data which is passed to the API
import dotenv from 'dotenv';
import fs from 'fs';
import https from 'https';

import * as authRouter from './modules/auth/routes/auth.routes.js';
dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use('/auth', authRouter.default);

// getting pem and cert file for https setup
// const key = fs.readFileSync('./key.pem');
// const cert = fs.readFileSync('./cert.pem');
// const server = https.createServer({key: key, cert: cert }, app);
// console.log("Starting the server.")
app.listen(process.env.PORT, () => {
    console.log(`App is running on port### ${process.env.PORT}`);
});
