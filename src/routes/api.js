import express from "express";
import UserController from "../controller/UserController.js"
import AdminController from "../controller/AdminController.js"
import { checkUserJWT, checkUserPermisstion } from "../midderWare/JWTaction.js"
import GaraController from "../controller/GaraController.js"
import GuestController from "../controller/GuestController.js"
const router = express.Router();


const initAPIRouters = (app) => {
    //nguoi dung chua dang ky
    router.post('/register/user', GuestController.postRegister)//done
    router.get('/gender/read', GuestController.getGender)//done
    router.get('/account', checkUserJWT, GuestController.getUserAccount)//done
    router.get('/gara/read', GuestController.readTopGara)//done
    router.get('/payment/read', GuestController.readPayment)//done
    router.get('/price/read', GuestController.readPrice)//done
    router.get('/service/read', GuestController.readService)//done
    router.get('/schedule/read', GuestController.readSchedule)//done
    router.get('/booking/readPricePayment', GuestController.readPricePayment)//done
    router.get('/booking/readService', GuestController.readServiceCar)//done
    router.post('/booking/createBooking', GuestController.createBooking)//done
    router.post('/vetyfy-booking', GuestController.vetyfyBooking)//done
    router.get('/comment/read', GuestController.readAllComment)//done
    router.get('/gara/getAllGara', GuestController.getAllGara)//done



    router.get('/provind/read', GuestController.readProvind)//done
    router.get('/gara/getAllCar', GuestController.getAllCarByGara)//done

    router.get('/detailGara/read/:id', GuestController.readDeatailGara)//done
    router.get('/car/readCarInfoByCariD', GuestController.readInfoCarById)
    router.get('/car/readCarInfoByCarCompany', GuestController.readInfoCar)
    router.get('/carCompany/read', GuestController.readCarCompany)//done
    router.get('/car/read', GuestController.readCar)//done
    router.get('/gara/readGarabyProvind', GuestController.readGarabyProvind)//done
    router.get('/gara/getAllDay', GuestController.getAllDay)//done
    router.get('/handbook/getTopHandBook', GuestController.getTopHandBook)//done
    router.get('/handbook/getHandBookRelateto', GuestController.getHandBookRelateto)//done
    router.get('/gara/readGarabyProvindCarCompanyCar', GuestController.readGarabyProvindCarCompanyCar)//done

    router.get('/gara/searchHandBook', GuestController.searchHandBook)//done
    //nguoi dung da dangky

    router.post('/login/user', UserController.handldLogin)//done
    router.post('/logout/user', UserController.handlLogout)//done
    router.get('/getUserbyId', UserController.getUserbyId)//done
    router.post('/register/gara', checkUserJWT, checkUserPermisstion, UserController.postRegisterGara)//done
    router.get('/getAllOrder', UserController.getAllOrder)//done
    router.get('/order/searchOrder', UserController.searchOrder)//done
    router.post('/comment/create', UserController.createComment)//done
    //nguoi dung dag ky gara
    router.get('/carCompany/searchCarcompany', AdminController.searchCarcompany)//done
    router.get('/gara/readTime', GaraController.readAllTime)//done
    router.get('/gara/readdata', GaraController.readInfoGara)//done
    router.post('/gara/registerCar', GaraController.registerCartoGara)//done
    router.post('/gara/createBulkSchedule', GaraController.createBulkSchedule)//done
    router.delete('/gara/deletePickCar', GaraController.deletePickCar)//done
    router.get('/gara/getListBooking', GaraController.getListBooking)//done
    router.post('/gara/comfimeBooking', GaraController.comfimeBooking)//done
    router.get('/gara/getListOrder', GaraController.getListOrder)//done
    router.post('/gara/finishOrder', GaraController.finishOrder)//done
    router.put('/gara/canserOrder', GaraController.canserOrder)//done
    router.put('/gara/canserBooking', GaraController.canserBooking)//done
    router.put('/gara/updateGara', GaraController.updateGara)//done

    //ngui kiem duyet
    router.put('/gara/deniceGara', AdminController.deniceGara)//done
    router.get('/handbook/searchHandbookStaff', AdminController.searchHandbookStaff)//done
    router.get('/comment/searchComment', AdminController.searchComment)//done
    router.get('/comment/getComentbypage', AdminController.getComentbypage)//done
    router.delete('/carCompany/deleteCarCompany', AdminController.deleteCarCompany)//done
    router.post('/carCompany/createCarCompany', AdminController.createCarCompany)//done
    router.put('/carCompany/updateCarCompany', AdminController.updateCarCompany)//done
    router.get('/booking/searchBooking', AdminController.searchBooking)//done
    router.get('/user/searchUser', AdminController.searchUser)//done
    router.get('/car/searchCar', AdminController.searchCar)//done
    router.get('/gara/searchGaranocenser', AdminController.searchGaranocenser)//done
    router.get('/gara/searchGara', AdminController.searchGara)//done
    router.put('/accep/gara', AdminController.accepGara)//done
    router.get('/user/read', AdminController.readUser)//done
    router.get('/handBook/read', AdminController.readHandBook)//done
    router.post('/handBook/create', AdminController.createHandBook)//done
    router.put('/handBook/update', AdminController.updateHandbook)//done
    router.get('/user/getAllGroup', AdminController.getAllGroup)//done
    router.get('/gara/getAllGarabyPage', AdminController.getAllGarabyPage)//done
    router.get('/booking/getAllBookingbypage', AdminController.getAllBookingbypage)//done
    router.get('/status/getAllStatus', AdminController.getAllStatus)//done
    router.put('/booking/updateStatus', AdminController.updateStatus)//done
    //admin
    router.delete('/booking/deleteBooking', AdminController.deleteBooking)//done
    router.delete('/comment/deleteComment', AdminController.deleteComment)//done
    router.get('/carCompany/getCarCompanyByPage', AdminController.getCarCompanyByPage)//done
    router.get('/handbook/searchHandbookUncensor', AdminController.searchHandbookUncensor)//done
    router.get('/handbook/searchHandbook', AdminController.searchHandbook)//done
    router.get('/staff/readAllStaff', AdminController.readAllStaff)//done
    router.delete('/handBook/delete', AdminController.deleteHandbook)//done
    router.delete('/gara/delete', AdminController.deleteGara)//done
    router.get('/handBook/readById', AdminController.readHandBookById)//done
    router.get('/handBook/readAll', AdminController.readAllHandbook)//done
    router.put('/handBook/accep', AdminController.accepHandBook)//done
    router.post('/car/create', AdminController.createCar)//done
    router.put('/car/update', AdminController.updateCar)//done
    router.delete('/car/delete', AdminController.deleteCar)//done
    router.get('/garanoncensorship/read', AdminController.readGaraNonCensorship)//done
    router.put('/user/update', AdminController.userUpdate)//done
    router.delete('/user/delete', AdminController.deleteUser)//done
    router.get('/test', AdminController.test)




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