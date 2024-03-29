import userService from '../service/userService'

let handldLogin = async (req, res) => {
    try {

        let data = await userService.LoginUser(req.body)



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

let handlLogout = async (req, res) => {
    try {

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

let searchOrder = async (req, res) => {
    try {

        let gara = req.query.gara
        let status = req.query.status
        let user = req.query.user





        let data = await userService.searchOrderService(gara, status, user)
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
let getUserbyId = async (req, res) => {
    try {

        let id = req.query.id







        let data = await userService.getUserbyIdService(id)
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
let chanepass = async (req, res) => {




    try {

        let response = await userService.chanepassService(req.body);
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
    handldLogin, handlLogout, postRegisterGara,

    getAllOrder, createComment, searchOrder, getUserbyId, chanepass
}