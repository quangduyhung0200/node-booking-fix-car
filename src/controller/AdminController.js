import AdminService from '../service/AdminService'

let readUser = async (req, res) => {
    try {

        if (req.query.page && req.query.limit && req.query) {
            let page = req.query.page;
            let limit = req.query.limit;
            let data = await AdminService.getUserWithPage(+page, +limit)
            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT
            })
        }
        else {
            let data = await AdminService.getAllUser()
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
let readGaraNonCensorship = async (req, res) => {
    try {

        if (req.query.page && req.query.limit && req.query) {
            let page = req.query.page;
            let limit = req.query.limit;
            let data = await AdminService.getGaraWithPage(+page, +limit)
            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT
            })
        }
        else {
            let data = await AdminService.getAllGara()
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

let accepGara = async (req, res) => {
    try {


        let data = await AdminService.accepGaraService(req.body)
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
let test = async (req, res) => {
    try {


        let data = await AdminService.test()
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data
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


let createCar = async (req, res) => {
    try {




        let data = await AdminService.createCarService(req.body)
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
let updateCar = async (req, res) => {
    try {




        let data = await AdminService.updateCarService(req.body)
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
let deleteCar = async (req, res) => {
    try {
        let data = await AdminService.deleteUserService(req.body.id)
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
let readHandBook = async (req, res) => {
    try {

        if (req.query.page && req.query.limit && req.query && req.query.staffId) {
            let page = req.query.page;
            let limit = req.query.limit;
            let staffId = req.query.staffId;
            let data = await AdminService.readHandBookService(+page, +limit, +staffId)
            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT
            })
        }
        else {
            let data = await AdminService.getAllHandBook()
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
module.exports = {
    readUser, readGaraNonCensorship, accepGara, test, createCar, updateCar, deleteCar, readHandBook
}