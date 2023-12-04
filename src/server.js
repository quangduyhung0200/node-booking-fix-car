import express from "express";
require('dotenv').config();
import configViewEngine from "./configs/viewEngine";
import initWebRoutes from "./routes/web";
import bodyParser from "body-parser";

let app = express();
configViewEngine(app)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
initWebRoutes(app)
let PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log('backend nodejs is running in the port: ', PORT)
});
