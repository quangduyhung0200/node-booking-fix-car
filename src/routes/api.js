import express from "express";
import UserController from "../controller/UserController.js"
import AdminController from "../controller/AdminController.js"
import { checkUserJWT, checkUserPermisstion } from "../midderWare/JWTaction.js"
import GaraController from "../controller/GaraController.js"
import GuestController from "../controller/GuestController.js"
const router = express.Router();


const initAPIRouters = (app) => {
    //nguoi dung chua dang ky
    router.post('/register/user', GuestController.postRegister)
    router.get('/gender/read', GuestController.getGender)
    router.get('/account', checkUserJWT, GuestController.getUserAccount)
    router.get('/gara/read', GuestController.readTopGara)
    router.get('/payment/read', GuestController.readPayment)
    router.get('/price/read', GuestController.readPrice)
    router.get('/service/read', GuestController.readService)
    router.get('/schedule/read', GuestController.readSchedule)
    router.get('/booking/readPricePayment', GuestController.readPricePayment)
    router.get('/booking/readService', GuestController.readServiceCar)
    router.post('/booking/createBooking', GuestController.createBooking)
    router.post('/vetyfy-booking', GuestController.vetyfyBooking)
    router.get('/comment/read', GuestController.readAllComment)
    router.get('/gara/getAllGara', GuestController.getAllGara)



    router.get('/provind/read', GuestController.readProvind)
    router.get('/gara/getAllCar', GuestController.getAllCarByGara)

    router.get('/detailGara/read/:id', GuestController.readDeatailGara)
    router.get('/car/readCarInfoByCariD', GuestController.readInfoCarById)
    router.get('/car/readCarInfoByCarCompany', GuestController.readInfoCar)
    router.get('/carCompany/read', GuestController.readCarCompany)
    router.get('/car/read', GuestController.readCar)
    router.get('/gara/readGarabyProvind', GuestController.readGarabyProvind)
    router.get('/gara/getAllDay', GuestController.getAllDay)
    router.get('/handbook/getTopHandBook', GuestController.getTopHandBook)
    router.get('/handbook/getHandBookRelateto', GuestController.getHandBookRelateto)
    router.get('/gara/readGarabyProvindCarCompanyCar', GuestController.readGarabyProvindCarCompanyCar)
    router.post('/login/user', UserController.handldLogin)
    router.get('/gara/searchHandBook', GuestController.searchHandBook)
    router.get('/handbook/searchHandbook', AdminController.searchHandbook)
    router.get('/handBook/readById', AdminController.readHandBookById)
    //nguoi dung da dangky

    router.get('/status/getAllStatus', checkUserJWT, checkUserPermisstion, AdminController.getAllStatus)//done
    router.post('/logout/user', checkUserJWT, checkUserPermisstion, UserController.handlLogout)
    router.get('/getUserbyId', checkUserJWT, checkUserPermisstion, UserController.getUserbyId)
    router.post('/register/gara', checkUserJWT, checkUserPermisstion, UserController.postRegisterGara)
    router.get('/getAllOrder', checkUserJWT, checkUserPermisstion, UserController.getAllOrder)
    router.get('/order/searchOrder', checkUserJWT, checkUserPermisstion, UserController.searchOrder)
    router.post('/comment/create', checkUserJWT, checkUserPermisstion, UserController.createComment)
    //nguoi dung dag ky gara
    router.get('/carCompany/searchCarcompany', checkUserJWT, checkUserPermisstion, AdminController.searchCarcompany)
    router.get('/gara/readTime', checkUserJWT, checkUserPermisstion, GaraController.readAllTime)
    router.get('/gara/readdata', checkUserJWT, checkUserPermisstion, GaraController.readInfoGara)
    router.post('/gara/registerCar', checkUserJWT, checkUserPermisstion, GaraController.registerCartoGara)
    router.post('/gara/createBulkSchedule', checkUserJWT, checkUserPermisstion, GaraController.createBulkSchedule)
    router.delete('/gara/deletePickCar', checkUserJWT, checkUserPermisstion, GaraController.deletePickCar)
    router.get('/gara/getListBooking', checkUserJWT, checkUserPermisstion, GaraController.getListBooking)
    router.post('/gara/comfimeBooking', checkUserJWT, checkUserPermisstion, GaraController.comfimeBooking)
    router.get('/gara/getListOrder', checkUserJWT, checkUserPermisstion, GaraController.getListOrder)
    router.post('/gara/finishOrder', checkUserJWT, checkUserPermisstion, GaraController.finishOrder)
    router.put('/gara/canserOrder', checkUserJWT, checkUserPermisstion, GaraController.canserOrder)
    router.put('/gara/canserBooking', checkUserJWT, checkUserPermisstion, GaraController.canserBooking)
    router.put('/gara/updateGara', checkUserJWT, checkUserPermisstion, GaraController.updateGara)
    router.get('/gara/getprofit', GaraController.getprofit)//done

    //ngui kiem duyet
    router.put('/gara/deniceGara', checkUserJWT, checkUserPermisstion, AdminController.deniceGara)
    router.get('/handbook/searchHandbookStaff', checkUserJWT, checkUserPermisstion, AdminController.searchHandbookStaff)
    router.get('/comment/searchComment', checkUserJWT, checkUserPermisstion, AdminController.searchComment)
    router.get('/comment/getComentbypage', checkUserJWT, checkUserPermisstion, AdminController.getComentbypage)

    router.post('/carCompany/createCarCompany', checkUserJWT, checkUserPermisstion, AdminController.createCarCompany)
    router.put('/carCompany/updateCarCompany', checkUserJWT, checkUserPermisstion, AdminController.updateCarCompany)
    router.get('/booking/searchBooking', checkUserJWT, checkUserPermisstion, AdminController.searchBooking)
    router.get('/user/searchUser', checkUserJWT, checkUserPermisstion, AdminController.searchUser)
    router.get('/car/searchCar', checkUserJWT, checkUserPermisstion, AdminController.searchCar)
    router.get('/gara/searchGaranocenser', checkUserJWT, checkUserPermisstion, AdminController.searchGaranocenser)
    router.get('/gara/searchGara', checkUserJWT, checkUserPermisstion, AdminController.searchGara)
    router.put('/accep/gara', checkUserJWT, checkUserPermisstion, AdminController.accepGara)
    router.get('/user/read', checkUserJWT, checkUserPermisstion, AdminController.readUser)
    router.get('/handBook/read', checkUserJWT, checkUserPermisstion, AdminController.readHandBook)
    router.post('/handBook/create', checkUserJWT, checkUserPermisstion, AdminController.createHandBook)
    router.put('/handBook/update', checkUserJWT, checkUserPermisstion, AdminController.updateHandbook)
    router.get('/user/getAllGroup', checkUserJWT, checkUserPermisstion, AdminController.getAllGroup)
    router.get('/gara/getAllGarabyPage', checkUserJWT, checkUserPermisstion, AdminController.getAllGarabyPage)
    router.get('/booking/getAllBookingbypage', checkUserJWT, checkUserPermisstion, AdminController.getAllBookingbypage)
    router.get('/carCompany/getCarCompanyByPage', checkUserJWT, checkUserPermisstion, AdminController.getCarCompanyByPage)
    router.put('/booking/updateStatus', checkUserJWT, checkUserPermisstion, AdminController.updateStatus)
    router.post('/car/create', checkUserJWT, checkUserPermisstion, AdminController.createCar)
    router.put('/car/update', checkUserJWT, checkUserPermisstion, AdminController.updateCar)
    router.get('/garanoncensorship/read', checkUserJWT, checkUserPermisstion, AdminController.readGaraNonCensorship)
    router.put('/user/update', checkUserJWT, checkUserPermisstion, AdminController.userUpdate)
    //admin
    router.delete('/carCompany/deleteCarCompany', checkUserJWT, checkUserPermisstion, AdminController.deleteCarCompany)
    router.delete('/booking/deleteBooking', checkUserJWT, checkUserPermisstion, AdminController.deleteBooking)
    router.delete('/comment/deleteComment', checkUserJWT, checkUserPermisstion, AdminController.deleteComment)

    router.get('/handbook/searchHandbookUncensor', checkUserJWT, checkUserPermisstion, AdminController.searchHandbookUncensor)

    router.get('/staff/readAllStaff', checkUserJWT, checkUserPermisstion, AdminController.readAllStaff)
    router.delete('/handBook/delete', checkUserJWT, checkUserPermisstion, AdminController.deleteHandbook)
    router.delete('/gara/delete', checkUserJWT, checkUserPermisstion, AdminController.deleteGara)

    router.get('/handBook/readAll', checkUserJWT, checkUserPermisstion, AdminController.readAllHandbook)
    router.put('/handBook/accep', checkUserJWT, checkUserPermisstion, AdminController.accepHandBook)
    router.put('/handBook/denice', checkUserJWT, checkUserPermisstion, AdminController.deniceHandBook)

    router.delete('/car/delete', checkUserJWT, checkUserPermisstion, AdminController.deleteCar)


    router.delete('/user/delete', checkUserJWT, checkUserPermisstion, AdminController.deleteUser)//done





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