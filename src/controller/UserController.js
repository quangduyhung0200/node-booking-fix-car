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
        console.log('check data token: ', data)
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

        console.log('chcek req: ', req.body)
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
module.exports = {
    postRegister, getGender, handldLogin, getUserAccount, handlLogout, readProvind, postRegisterGara
}