import express from "express";
import homeController from '../controller/homeController'
const router = express.Router();
const initWebRoutes = (app) => {
    router.get('/', homeController.HandleHelloWorld)
    router.get('/user', homeController.HandleUser)
    router.post('/users/create-user', homeController.HandleCreateUser)
    return app.use("/", router);
}
export default initWebRoutes