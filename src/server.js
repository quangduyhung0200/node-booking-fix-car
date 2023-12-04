import express from "express";
require('dotenv').config();
import configViewEngine from "./configs/viewEngine";
import initWebRoutes from "./routes/web";

let app = express();
configViewEngine(app)
initWebRoutes(app)
let PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log('backend nodejs is running in the port: ', PORT)
});
