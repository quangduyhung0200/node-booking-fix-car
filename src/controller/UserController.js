import userService from '../service/userService'
let postRegister = async (req, res) => {
    try {

        if (!req.body.address && !req.body.gender && !req.body.phone && !req.body.userName
            && !req.body.comfimPassword && !req.body.email && !req.body.password) {
            return res.status(200).json({
                EM: 'missign requeir params',
                EC: 1,
                DT: ''
            })
        }
        let data = await userService.createRegisterUser(req.body)
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: ''
        })
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            EM: 'erro from sever',
            EC: -1,
            DT: ''

        })

    }

}
let getGender = async (req, res) => {
    try {

        let data = await userService.getGender()
        if (data) {
            return res.status(200).json({
                EM: 'get gender success',
                EC: 0,
                DT: data.DT
            })
        }
        else {
            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: ''
            })
        }



    } catch (e) {
        console.log(e)
        return res.status(500).json({
            EM: 'erro from sever',
            EC: -2,
            DT: ''

        })

    }

}
let handldLogin = async (req, res) => {
    try {

        let data = await userService.LoginUser(req.body)
        if (data && data.DT.access_token) {
            res.cookie("jwt", data.DT.access_token, { httpOnly: true, maxAge: 60 * 60 * 1000 * 24 })
        }

        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })




    } catch (e) {
        console.log(e)
        return res.status(500).json({
            EM: 'erro from sever',
            EC: -2,
            DT: ''

        })

    }

}
const getUserAccount = async (req, res) => {

    return res.status(200).json({
        EM: "ok",
        EC: 0,
        DT: {
            access_token: req.token,
            ...req.user
        }
    })
}
let handlLogout = async (req, res) => {
    try {
        res.clearCookie("jwt");
        return res.status(200).json({
            EM: 'ok',
            EC: 0,
            DT: ''
        })

    }

    catch (e) {
        console.log(e)
        return res.status(500).json({
            EM: 'erro from sever',
            EC: -1,
            DT: ''

        })

    }

}
let readProvind = async (req, res) => {
    try {
        let data = await userService.readProvindservice()
        if (data) {
            return res.status(200).json({
                EM: 'get provind success',
                EC: 0,
                DT: data.DT
            })
        }
        else {
            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: ''
            })
        }


    }

    catch (e) {
        console.log(e)
        return res.status(500).json({
            EM: 'erro from sever',
            EC: -1,
            DT: ''

        })

    }

}
let postRegisterGara = async (req, res) => {
    try {


        let data = await userService.createRegisterGara(req.body)
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: ''
        })
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            EM: 'erro from sever',
            EC: -1,
            DT: ''

        })

    }

}
let readTopGara = async (req, res) => {
    let limit = req.query.limit;
    if (!limit) limit = 10;

    try {
        let response = await userService.readTopGaraService(+limit);
        return res.status(200).json(response)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            massge: 'erro from server...'
        })
    }
}
let readPrice = async (req, res) => {

    try {
        let response = await userService.readAllPrice();
        return res.status(200).json(response)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            massge: 'erro from server...'
        })
    }
}
let readPayment = async (req, res) => {

    try {
        let response = await userService.readAllPayment();
        return res.status(200).json(response)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            massge: 'erro from server...'
        })
    }
}
let readService = async (req, res) => {

    try {
        let response = await userService.readAllService();
        return res.status(200).json(response)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            massge: 'erro from server...'
        })
    }
}
let readSchedule = async (req, res) => {

    try {

        let response = await userService.readScheduleByDay(req.query.garaId, req.query.day);
        return res.status(200).json(response)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            massge: 'erro from server...'
        })
    }
}
let readServiceCar = async (req, res) => {

    try {

        let response = await userService.readServiceCarService(req.query.garaId, req.query.carId);
        return res.status(200).json(response)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            massge: 'erro from server...'
        })
    }
}
let readPricePayment = async (req, res) => {

    try {

        let response = await userService.readPricePaymentService(req.query.garaId, req.query.carId, req.query.serviceId);
        return res.status(200).json(response)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            massge: 'erro from server...'
        })
    }
}
let createBooking = async (req, res) => {
    try {


        let data = await userService.createBookingService(req.body)
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: ''
        })
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            EM: 'erro from sever',
            EC: -1,
            DT: ''

        })

    }

}
let vetyfyBooking = async (req, res) => {
    try {
        let response = await userService.vetyfyBookingService(req.body);
        return res.status(200).json(response)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            massge: 'err from sever'
        })

    }
}
let getAllOrder = async (req, res) => {

    try {

        let response = await userService.getAllOrderService(req.query.userId);
        return res.status(200).json(response)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            massge: 'erro from server...'
        })
    }
}
let createComment = async (req, res) => {
    try {
        let response = await userService.createCommentService(req.body);
        return res.status(200).json(response)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            massge: 'err from sever'
        })

    }
}
let readAllComment = async (req, res) => {

    try {

        let response = await userService.readAllCommentService(req.query.garaId);
        return res.status(200).json(response)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            massge: 'erro from server...'
        })
    }
}
module.exports = {
    postRegister, getGender, handldLogin, getUserAccount, handlLogout, readProvind, postRegisterGara, readTopGara,
    readPrice, readPayment, readService, readSchedule, readServiceCar, readPricePayment, createBooking, vetyfyBooking,
    getAllOrder, createComment, readAllComment
}