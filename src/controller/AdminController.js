import AdminService from '../service/AdminService'

let readUser = async (req, res) => {
    try {
        console.log(req.query)
        if (req.query.page !== 'ALL') {
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
        let data = await AdminService.deletecarService(req.body.id)
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

        if (req.query.page && req.query.limit && req.query && req.query.staffId !== 'ALL') {
            console.log('ok')
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
            console.log('nook')
            let page = req.query.page;
            let limit = req.query.limit;
            let data = await AdminService.getAllHandBook(+page, +limit)
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
let createHandBook = async (req, res) => {
    try {




        let data = await AdminService.createHandBookService(req.body)
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
let readHandBookById = async (req, res) => {
    try {

        if (req.query.id) {

            let id = req.query.id;

            let data = await AdminService.readHandBookById(+id)
            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT
            })
        }
        else {
            console.log(e)
            return res.status(500).json({
                EM: 'missing requi',
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
let accepHandBook = async (req, res) => {
    try {




        let data = await AdminService.accepHandBookService(req.body)
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
let getAllGroup = async (req, res) => {
    try {




        let data = await AdminService.getAllGroupService()
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
let userUpdate = async (req, res) => {
    try {




        let data = await AdminService.userUpdateService(req.body)
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
let readAllHandbook = async (req, res) => {
    try {



        let page = req.query.page;
        let limit = req.query.limit;

        let data = await AdminService.readAllHandbookService(+page, +limit)
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
let deleteUser = async (req, res) => {
    try {




        let data = await AdminService.deleteUserService(req.body)
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
let updateHandbook = async (req, res) => {
    try {




        let data = await AdminService.updateHandbookService(req.body)
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
let deleteHandbook = async (req, res) => {
    try {




        let data = await AdminService.deleteHandbookService(req.body)
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
let getAllGarabyPage = async (req, res) => {
    try {



        let page = req.query.page;
        let limit = req.query.limit;

        let data = await AdminService.getAllGarabyPageService(+page, +limit)
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
let deleteGara = async (req, res) => {
    try {




        let data = await AdminService.deleteGaraService(req.body)
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
let getAllBookingbypage = async (req, res) => {
    try {



        let page = req.query.page;
        let limit = req.query.limit;

        let data = await AdminService.getAllBookingbypageService(+page, +limit)
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
let getAllStatus = async (req, res) => {
    try {





        let data = await AdminService.getAllStatus()
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
let updateStatus = async (req, res) => {
    try {




        let data = await AdminService.updateStatusService(req.body)
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
let searchBooking = async (req, res) => {
    try {

        let user = req.query.user
        let gara = req.query.gara
        let car = req.query.car
        let service = req.query.service
        let date = req.query.date
        let price = req.query.price
        let status = req.query.status



        let data = await AdminService.searchBookingService(user, gara, car, service, date, price, status)
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
let searchUser = async (req, res) => {
    try {

        let user = req.query.user
        let group = req.query.group




        let data = await AdminService.searchUserService(user, group)
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
let searchGaranocenser = async (req, res) => {
    try {

        let gara = req.query.gara
        let provind = req.query.provind




        let data = await AdminService.searchGaranocenserService(gara, provind)
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
let searchGara = async (req, res) => {
    try {

        let gara = req.query.gara
        let provind = req.query.provind




        let data = await AdminService.searchGaraService(gara, provind)
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
    readUser, readGaraNonCensorship, accepGara, test, createCar, updateCar, deleteCar, readHandBook, createHandBook, readHandBookById,
    accepHandBook, getAllGroup, userUpdate, readAllHandbook, deleteUser, updateHandbook, deleteHandbook, getAllGarabyPage, deleteGara,
    getAllBookingbypage, getAllStatus, updateStatus, searchBooking, searchUser, searchGaranocenser, searchGara
}