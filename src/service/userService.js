import bcrypt from 'bcryptjs';
import db from '../models/index';
import { getGroupWithRole } from './JWTservice'
import { createJWT } from '../midderWare/JWTaction'
import { where } from 'sequelize';
const { Op } = require("sequelize");
var salt = bcrypt.genSaltSync(10);
const checkemailIsExit = async (email) => {
    let data = await db.User.findOne({ where: { email: email } })
    if (data) {
        return false
    }
    else
        if (!data) {
            return true
        }
}
const hashUserPassword = (password) => {
    let hashpassword = bcrypt.hashSync(password, salt)
    return hashpassword

}
const checkPassword = (password, hashPassword) => {
    return bcrypt.compareSync(password, hashPassword);
}
const getGender = async () => {
    try {

        let data = await db.Gender.findAll()
        return {
            EM: `create success role`,
            EC: 0,
            DT: data
        }

    } catch (e) {
        console.log(e)
        return {
            EM: 'SOMTHING WRONG',
            EC: -1,
            DT: []
        }
    }

}
const createRegisterUser = async (rawUserData) => {
    let checkMail = await checkemailIsExit(rawUserData.email)


    let hashPassword = hashUserPassword(rawUserData.password)

    try {
        if (checkMail) {
            await db.User.create({
                userName: rawUserData.userName,
                password: hashPassword,
                email: rawUserData.email,
                phone: rawUserData.phone,
                gender: rawUserData.gender,
                address: rawUserData.address,
                groupId: 1,



            })

            return {
                EM: 'register success',
                EC: 0,
                DT: ''
            }
        }
        else {
            return {
                EM: 'register dont success',
                EC: 2,
                DT: ''
            }
        }

    } catch (e) {
        console.log(e)
        data.EM = 'somthing wropng'
        data.EC = -1
    }
    return data
}
let LoginUser = async (rawData) => {
    let data = {}
    try {
        let checkMail = await checkemailIsExit(rawData.email)
        if (!checkMail) {
            let datamail = await db.User.findOne({ where: { email: rawData.email } })

            let checkpass = checkPassword(rawData.password, datamail.password)
            if (checkpass) {
                let role = await getGroupWithRole(datamail)

                let payload = {
                    email: datamail.email,
                    userName: datamail.userName,
                    role

                }
                let token = createJWT(payload)

                return {
                    EM: 'login success',
                    EC: 0,
                    DT: {
                        access_token: token,
                        data: role,
                        email: datamail.email,
                        userName: datamail.userName
                    }
                }

            }
            else {
                return {
                    EM: 'wrong passworld',
                    EC: 1,
                    DT: ''
                }
            }
        } else {
            return {
                EM: 'wrong email',
                EC: 2,
                DT: ''
            }
        }


    } catch (e) {
        console.log(e)
        return {
            EM: 'songthing wrong',
            EC: -1,
            DT: ''
        }
    }

}
let readProvindservice = async () => {
    try {

        let data = await db.Provind.findAll({ attributes: ["id", "name"], })
        return {
            EM: `get provind success`,
            EC: 0,
            DT: data
        }

    } catch (e) {
        console.log(e)
        return {
            EM: 'SOMTHING WRONG',
            EC: -1,
            DT: []
        }
    }

}
let createRegisterGara = async (rawUserData) => {
    let checkMail = await checkemailIsExit(rawUserData.emailUser)
    let gara = await db.User.findOne({
        where: {
            email: rawUserData.emailUser,
            garaId: null
        }
    })
    try {
        if (checkMail === false && gara !== null) {
            await db.Gara.create({
                nameGara: rawUserData.nameGara,
                descriptionHTML: rawUserData.descriptionHTML,
                descriptionMarkDown: rawUserData.descriptionMarkDown,
                address: rawUserData.address,
                provindId: rawUserData.provindId,
                avata: rawUserData.avata,
                phone: rawUserData.phone,
                description: rawUserData.description,
            }).then(async function (data) {
                let user = await db.User.findOne({ where: { email: rawUserData.emailUser } }
                )
                if (user) {
                    user.garaId = data.dataValues.id;

                    user.save()
                }  // no useful info
            });
            return {
                EM: 'register success',
                EC: 0,
                DT: ''
            }
        }
        else {
            return {
                EM: 'you have register one',
                EC: 2,
                DT: ''
            }
        }

    } catch (e) {
        console.log(e)
        return {
            EM: 'song thing wrong',
            EC: -1,
            DT: ''
        }
    }

}
let readTopGaraService = async (limitInput) => {

    try {


        let user = await db.Gara.findAll({
            limit: limitInput,

            order: [['createdAt', 'DESC']],

            include: [
                {
                    model: db.Provind, as: 'provindGaraData'

                }

            ],
            raw: true,
            nest: true


        }
        )
        return {
            EM: 'GET DATA SUCCESS',
            EC: 0,
            DT: user
        }
    } catch (e) {
        console.log(e)
        return {
            EM: 'song thing wrong',
            EC: -1,
            DT: ''
        }
    }

}
let readAllPrice = async () => {

    try {


        let user = await db.Price.findAll({
            attributes: ["id", "value"],


        }
        )
        return {
            EM: 'GET DATA SUCCESS',
            EC: 0,
            DT: user
        }
    } catch (e) {
        console.log(e)
        return {
            EM: 'song thing wrong',
            EC: -1,
            DT: ''
        }
    }

}
let readAllPayment = async () => {

    try {


        let user = await db.Payment.findAll({
            attributes: ["id", "value"],


        }
        )
        return {
            EM: 'GET DATA SUCCESS',
            EC: 0,
            DT: user
        }
    } catch (e) {
        console.log(e)
        return {
            EM: 'song thing wrong',
            EC: -1,
            DT: ''
        }
    }

}
let readAllService = async () => {

    try {


        let user = await db.Service.findAll({
            attributes: ["id", "name"],


        }
        )
        return {
            EM: 'GET DATA SUCCESS',
            EC: 0,
            DT: user
        }
    } catch (e) {
        console.log(e)
        return {
            EM: 'song thing wrong',
            EC: -1,
            DT: ''
        }
    }

}
module.exports = {
    createRegisterUser, getGender, LoginUser, readProvindservice, createRegisterGara, readTopGaraService,
    readAllPrice, readAllPayment, readAllService
}