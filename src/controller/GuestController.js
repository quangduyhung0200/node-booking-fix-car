import guestService from '../service/GuestService'
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
        let data = await guestService.createRegisterUser(req.body)
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

        let data = await guestService.getGender()
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
let readTopGara = async (req, res) => {
    let limit = req.query.limit;
    if (!limit) limit = 10;

    try {
        let response = await guestService.readTopGaraService(+limit);
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
        let response = await guestService.readAllPayment();
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
        let response = await guestService.readAllPrice();
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
        let response = await guestService.readAllService();
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

        let response = await guestService.readScheduleByDay(req.query.garaId, req.query.day);
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

        let response = await guestService.readPricePaymentService(req.query.garaId, req.query.carId, req.query.serviceId);
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

        let response = await guestService.readServiceCarService(req.query.garaId, req.query.carId);
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


        let data = await guestService.createBookingService(req.body)
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
        let response = await guestService.vetyfyBookingService(req.body);
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

        let response = await guestService.readAllCommentService(req.query.garaId);
        return res.status(200).json(response)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            massge: 'erro from server...'
        })
    }
}
let getAllGara = async (req, res) => {

    try {

        let response = await guestService.getAllGaraService();
        return res.status(200).json(response)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            massge: 'erro from server...'
        })
    }
}
let getAllCarByGara = async (req, res) => {
    try {



        let garaId = req.query.id;
        let data = await guestService.getAllCarByGaraService(garaId)
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
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
let readDeatailGara = async (req, res) => {
    try {

        if (req.params.id) {
            let id = req.params.id;

            let data = await guestService.getGaraWithId(id)
            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT
            })
        }
        else {

            return res.status(200).json({
                EM: 'you dont pass the id',
                EC: 1,
                DT: ''
            })
        }

    } catch (e) {
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
        let data = await guestService.readProvindservice()
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
let readInfoCarById = async (req, res) => {
    try {

        if (req.query.carId && req.query) {
            let carId = req.query.carId;

            let data = await guestService.getCarWithCarId(+carId)
            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT
            })
        }
        else {
            return res.status(200).json({
                EM: 'you dont pass the id',
                EC: 1,
                DT: ''
            })
        }

    } catch (e) {
        console.log(e)
        return res.status(500).json({
            EM: 'erro from sever',
            EC: -1,
            DT: ''

        })
    }
}
let readInfoCar = async (req, res) => {
    try {

        if (req.query.carCompany && req.query && req.query.carCompany !== 'ALL') {
            let carCompany = req.query.carCompany;

            let data = await guestService.getCarWithCarCompany(carCompany)
            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT
            })
        }
        else {

            let data = await guestService.getAllCar()
            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT
            })
        }

    } catch (e) {
        console.log(e)
        return res.status(500).json({
            EM: 'erro from sever',
            EC: -1,
            DT: ''

        })
    }
}
let readCarCompany = async (req, res) => {
    try {




        let data = await guestService.readCarCompany()
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
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
let readCar = async (req, res) => {
    try {

        if (req.query.page !== 'ALL') {
            let page = req.query.page;
            let limit = req.query.limit;
            let data = await guestService.getCarWithPage(+page, +limit)
            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT
            })
        }
        else {
            let data = await guestService.getAllCar()
            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT
            })
        }

    } catch (e) {
        console.log(e)
        return res.status(500).json({
            EM: 'erro from sever',
            EC: -1,
            DT: ''

        })
    }

}
let readGarabyProvind = async (req, res) => {
    try {


        let data = await guestService.readGarabyProvind(req.query.provindId)
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
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
let readGarabyProvindCarCompanyCar = async (req, res) => {
    try {


        let data = await guestService.readGarabyProvindCarCompanyCar(req.query.provindId, req.query.carCompanyId, req.query.carId)
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
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
let getAllDay = async (req, res) => {
    try {


        let data = await guestService.getAllDayService(req.query.garaId)
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
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
module.exports = {
    postRegister, getGender, getUserAccount, readTopGara, readPayment, readPrice, readService, readSchedule, readPricePayment, readServiceCar,
    createBooking, vetyfyBooking, readAllComment, getAllGara, getAllCarByGara, readDeatailGara, readProvind, readInfoCarById, readInfoCar,
    readCarCompany, readCar, readGarabyProvind, readGarabyProvindCarCompanyCar, getAllDay
}