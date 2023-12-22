import express from "express";
import UserController from "../controller/UserController.js"
import AdminController from "../controller/AdminController.js"
import { checkUserJWT, checkUserPermisstion } from "../midderWare/JWTaction.js"

const router = express.Router();


const initAPIRouters = (app) => {

    // router.all('*', checkUserJWT, checkUserPermisstion,)

    router.post('/register/user', UserController.postRegister)
    router.get('/gender/read', UserController.getGender)
    router.post('/login/user', UserController.handldLogin)
    router.get('/account', checkUserJWT, UserController.getUserAccount)
    router.post('/logout/user', UserController.handlLogout)
    router.get('/provind/read', UserController.readProvind)
    router.post('/register/gara', checkUserJWT, checkUserPermisstion, UserController.postRegisterGara)





    router.get('/user/read', checkUserJWT, checkUserPermisstion, AdminController.readUser)
    router.get('/garanoncensorship/read', checkUserJWT, checkUserPermisstion, AdminController.readGaraNonCensorship)
    router.get('/detailGara/read/:id', checkUserJWT, checkUserPermisstion, AdminController.readDeatailGara)
    router.get('/test', AdminController.test)

    router.put('/accep/gara', AdminController.accepGara)

    // router.post('/login', ApiController.handldLogin)
    // router.post('/logout', ApiController.handlLogout)
    // router.get('/account', checkUserJWT, UserController.getUserAccount)

    // router.get('/user/read', checkUserJWT, checkUserPermisstion, UserController.readUser)
    // router.post('/user/create', checkUserJWT, checkUserPermisstion, UserController.createUser)
    // router.put('/user/upadte', checkUserJWT, checkUserPermisstion, UserController.updateUser)
    // router.delete('/user/delete', checkUserJWT, checkUserPermisstion, UserController.deleteUser)

    // router.get('/group/read', checkUserJWT, checkUserPermisstion, GroupController.readGroup)
    // router.post('/role/create', checkUserJWT, checkUserPermisstion, RoleControler.createRole)
    // router.get('/role/read', checkUserJWT, checkUserPermisstion, RoleControler.getAllRole)
    // router.delete('/role/delete', checkUserJWT, checkUserPermisstion, RoleControler.deleteRole)

    // router.get('/grouprole/read/:groupid', GroupRoleController.getAllGroupRole)
    // router.post('/grouprole/create', GroupRoleController.createGroupRole)
    return app.use("/api/v1/", router);
}
export default initAPIRouters