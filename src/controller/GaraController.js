import GaraService from '../service/GaraService'

let readInfoGara = async (req, res) => {

    try {
        console.log(req.query.id)
        let response = await GaraService.readInfoGaraService(req.query.id);
        return res.status(200).json(response)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            massge: 'erro from server...'
        })
    }
}
let readInfoCar = async (req, res) => {
    try {

        if (req.query.carCompany && req.query && req.query.carCompany !== 'ALL') {
            let carCompany = req.query.carCompany;

            let data = await GaraService.getCarWithCarCompany(carCompany)
            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT
            })
        }
        else {

            let data = await GaraService.getAllCar()
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
let readInfoCarById = async (req, res) => {
    try {

        if (req.query.carId && req.query) {
            let carId = req.query.carId;

            let data = await GaraService.getCarWithCarId(+carId)
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
let registerCartoGara = async (req, res) => {
    try {


        let data = await GaraService.registerCartoGaraService(req.body)
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
let readAllTime = async (req, res) => {
    try {


        let data = await GaraService.readAllTimeService()
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
let createBulkSchedule = async (req, res) => {
    try {

        let data = await GaraService.createBulkScheduleService(req.body);

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
let getAllCarByGara = async (req, res) => {
    try {



        let garaId = req.query.id;
        let data = await GaraService.getAllCarByGaraService(garaId)
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
let deletePickCar = async (req, res) => {
    try {



        console.log('adasdasdasd', req.body)
        let data = await GaraService.deletePickCarService(req.body)
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
let getListBooking = async (req, res) => {
    try {



        let garaId = req.query.garaId;
        let date = req.query.date;
        let data = await GaraService.getListBookingService(garaId, date)
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
let comfimeBooking = async (req, res) => {
    try {



        console.log(req.body)
        let data = await GaraService.comfimeBookingService(req.body)
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
let getListOrder = async (req, res) => {
    try {



        let garaId = req.query.garaId;
        let date = req.query.date;
        let data = await GaraService.getListOrderService(garaId, date)
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
    readInfoGara, readInfoCar, readInfoCarById, registerCartoGara, readAllTime, createBulkSchedule, getAllCarByGara,
    deletePickCar, getListBooking, comfimeBooking, getListOrder
}