import express from "express";
require('dotenv').config();
import configViewEngine from "./config/viewEngine";

import bodyParser from "body-parser";
import conecttion from "./config/connectDb";
import initAPIRouters from "./routes/api";
import configCors from "./config/cors";

import cookieParser from "cookie-parser";
let app = express();
let PORT = process.env.PORT || 8080;
configCors(app)
configViewEngine(app)
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true }, { limit: '50mb' }));

app.use(cookieParser())

conecttion()



initAPIRouters(app);

app.use((req, res) => {
    return res.send('404 not foud')
})
app.listen(PORT, () => {
    console.log('backend nodejs is running in the port: ', PORT)
});
