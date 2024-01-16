import GaraService from '../service/GaraService'

let readInfoGara = async (req, res) => {

    try {

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

let deletePickCar = async (req, res) => {
    try {




        let data = await GaraService.deletePickCarService(req.body)
        console.log(data)
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
let finishOrder = async (req, res) => {
    try {




        let data = await GaraService.finishOrderService(req.body)
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
let canserOrder = async (req, res) => {
    try {




        let data = await GaraService.canserOrderService(req.body)
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
let updateGara = async (req, res) => {
    try {




        let data = await GaraService.updateGaraService(req.body)
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
let canserBooking = async (req, res) => {
    try {




        let data = await GaraService.canserBookingService(req.body)
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
let getprofit = async (req, res) => {
    try {



        let garaId = req.query.garaId;
        let date = req.query.date;
        let data = await GaraService.getprofitService(garaId, date)
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
    readInfoGara, registerCartoGara, readAllTime, createBulkSchedule,
    deletePickCar, getListBooking, comfimeBooking, getListOrder, finishOrder, canserOrder, updateGara, canserBooking,
    getprofit
}