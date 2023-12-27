import bcrypt from 'bcryptjs';
import db from '../models/index';
import { getGroupWithRole } from './JWTservice'
import { createJWT } from '../midderWare/JWTaction'
import EmailService from './EmailService'
import { v4 as uuidv4 } from 'uuid';
const { Op } = require("sequelize");
var salt = bcrypt.genSaltSync(10);
let buidUrlEmail = (garaId, token) => {
    let resf = `${process.env.REACT_URL}/vetyfy-booking?token=${token}&garaId=${garaId}`
    return resf
}
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
        if (checkMail === false) {
            let datamail = await db.User.findOne({ where: { email: rawData.email } })

            let checkpass = checkPassword(rawData.password, datamail.password)
            if (checkpass) {
                let role = await getGroupWithRole(datamail)

                let payload = {
                    email: datamail.email,
                    userName: datamail.userName,
                    role,
                    id: datamail.id

                }
                let token = createJWT(payload)

                return {
                    EM: 'login success',
                    EC: 0,
                    DT: {
                        access_token: token,
                        data: role,
                        email: datamail.email,
                        userName: datamail.userName,
                        id: datamail.id
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
    let gara = await db.Gara.findOne({
        where: {
            userId: rawUserData.id,
            status: 'S1'
        }
    })
    try {
        if (checkMail === false && gara === null) {
            await db.Gara.create({
                nameGara: rawUserData.nameGara,
                descriptionHTML: rawUserData.descriptionHTML,
                descriptionMarkDown: rawUserData.descriptionMarkDown,
                address: rawUserData.address,
                provindId: rawUserData.provindId,
                avata: rawUserData.avata,
                phone: rawUserData.phone,
                description: rawUserData.description,
                userId: rawUserData.id,
                status: 'S1'
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
            where: {
                status: 'S2'
            },
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
let readScheduleByDay = async (garaId, day) => {

    try {

        let text = day.toString();

        let data = await db.Schedule.findAll({
            where: {
                garaId: +garaId,
                date: text
            },
            include: [
                { model: db.Time, as: 'timeDataSchedule', attributes: ['timValue'] },
                { model: db.Gara, as: 'GaraScheduleData', attributes: ["id", "nameGara", "address", "phone", "description", "descriptionHTML", "avata", "userId"], }




            ],
            order: [['timeType', 'ASC']],
            raw: true,
            nest: true

        })

        return {
            EM: 'GET DATA SUCCESS',
            EC: 0,
            DT: data
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
let readServiceCarService = async (garaId, carId) => {

    try {



        let data = await db.Gara_Car.findOne({
            where: {
                garaId: +garaId,
                carId: +carId
            },
            attributes: ['id'],
            raw: true,
            nest: true

        })

        if (data) {
            let service = await db.Service_Gara_Car.findAll({
                where: {
                    garaCarId: data.id
                },
                include: [{ model: db.Price, as: 'priceData' },
                { model: db.Payment, as: 'paymentData' }],
                raw: true,
                nest: true
            })

            if (service) {
                return {
                    EM: 'GET DATA SUCCESS',
                    EC: 0,
                    DT: service
                }
            }
            else {
                return {
                    EM: 'dataemty',
                    EC: 1,
                    DT: ''
                }
            }
        } else {
            return {
                EM: 'dataemty',
                EC: 1,
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
let readPricePaymentService = async (garaId, carId, serviceId) => {

    try {



        let data = await db.Gara_Car.findOne({
            where: {
                garaId: +garaId,
                carId: +carId
            },
            attributes: ['id'],
            raw: true,
            nest: true

        })

        if (data) {
            let service = await db.Service_Gara_Car.findOne({
                where: {
                    garaCarId: data.id,
                    serviceId: serviceId
                },
                include: [{ model: db.Price, as: 'priceData' },
                { model: db.Payment, as: 'paymentData' }],
                raw: true,
                nest: true
            })

            if (service) {
                return {
                    EM: 'GET DATA SUCCESS',
                    EC: 0,
                    DT: service
                }
            }
            else {
                return {
                    EM: 'dataemty',
                    EC: 1,
                    DT: ''
                }
            }
        } else {
            return {
                EM: 'dataemty',
                EC: 1,
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
let createBookingService = async (data) => {
    return new Promise(async (resolve, reject) => {

        try {
            let token = uuidv4();
            await EmailService.sendSimpleEmail({
                reciverEmail: data.email,
                customerName: data.userName,
                time: data.time,
                GaraName: data.garaName,

                rediretLink: buidUrlEmail(data.garaId, token)
            }

            )
            let user = await db.User.findOrCreate({
                where: { email: data.email },
                defaults: {
                    email: data.email,
                    groupId: 1,
                    userName: data.userName,
                    address: data.address,


                },
                raw: true

            });
            console.log(user[0].id,)
            if (user && user[0]) {
                let booking = await db.Booking.findOne({
                    where: {
                        date: data.date,
                        garaId: data.garaId,
                        timetype: data.timetype,
                        userId: user[0].id,
                        carId: data.carId,
                        serviceId: data.serviceId
                    }
                })
                if (booking === null) {
                    await db.Booking.create({
                        userId: user[0].id,
                        garaId: data.garaId,
                        carId: data.carId,
                        timeType: data.timetype,
                        date: data.date,
                        status: 'S1',
                        token: token,
                        serviceId: data.serviceId
                    })
                    resolve({
                        EC: 0,
                        EM: 'DAT LICH THANH CONG',
                        DT: ''



                    })

                } else {
                    resolve({
                        EC: 1,
                        EM: 'ban da dat trung vui long kiem tra lai',
                        DT: ''



                    })
                }


            }



            resolve({
                EC: 0,
                EM: 'DAT LICH THANH CONG',
                DT: ''



            })


        } catch (e) {
            console.log(e)
            reject({
                EC: -1,
                EM: 'somthing wrong',
                DT: ''



            })
        }
    }
    )
}



let vetyfyBookingService = async (data) => {

    try {
        console.log('check data: ', data)
        let ec = ''
        let appoiment = await db.Booking.findOne({
            where: {
                token: data.token,
                garaId: data.garaId,
                status: 'S1'
            },
            raw: true

        })
        console.log('check appoiment: ', appoiment)
        if (appoiment !== null) {
            console.log('booking', appoiment)
            appoiment.status = 'S2';
            await appoiment.save();
            ec = 0
        }
        else {
            ec = 2
        }
        return {
            EM: 'dat lich thanh cong',
            EC: ec,
            DT: ''
        }





    }
    catch (e) {
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
    readAllPrice, readAllPayment, readAllService, readScheduleByDay, readServiceCarService, readPricePaymentService,
    createBookingService, vetyfyBookingService
}