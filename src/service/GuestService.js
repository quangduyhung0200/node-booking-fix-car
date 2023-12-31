import db from "../models";
import bcrypt from 'bcryptjs';
import _ from "lodash";
import EmailService from './EmailService'
import schedule from "../models/schedule";
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
const { Op, where } = require("sequelize");
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


            let user = await db.User.findOne({
                where: { email: rawUserData.email }




            })
            if (user && user.password === null) {
                user.userName = rawUserData.userName;
                user.password = hashPassword;
                user.email = rawUserData.email;
                user.phone = rawUserData.phone;
                user.gender = rawUserData.gender;
                user.address = rawUserData.address;
                user.groupId = 1;
                user.save()
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
        }




    } catch (e) {
        console.log(e)
        data.EM = 'somthing wropng'
        data.EC = -1
    }
    return data
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
                date: text,

            },
            include: [
                { model: db.Time, as: 'timeDataSchedule', attributes: ['timValue'] },
                { model: db.Gara, as: 'GaraScheduleData', attributes: ["id", "nameGara", "address", "phone", "description", "descriptionHTML", "avata", "userId"], }




            ],
            order: [['timeType', 'ASC']],
            raw: true,
            nest: true

        })
        let tocreate2 = []
        data.map(item => item.currenOrder !== item.maxOrder ?
            tocreate2.push({
                GaraScheduleData: item.GaraScheduleData, garaId: garaId, date: item.date,
                timeType: item.timeType, maxOrder: +item.maxOrder, currenOrder: +item.currenOrder, id: item.id, timeDataSchedule: item.timeDataSchedule
            }) : '')

        return {
            EM: 'GET DATA SUCCESS',
            EC: 0,
            DT: tocreate2
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
let createBookingService = async (data) => {
    return new Promise(async (resolve, reject) => {

        try {
            let token = uuidv4();

            let user = await db.User.findOrCreate({
                where: { email: data.email },
                defaults: {
                    email: data.email,
                    groupId: 5,
                    userName: data.userName,
                    address: data.address,


                },
                raw: true

            });

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
                    await EmailService.sendSimpleEmail({
                        reciverEmail: data.email,
                        customerName: data.userName,
                        time: data.time,
                        GaraName: data.garaName,

                        rediretLink: buidUrlEmail(data.garaId, token)
                    }

                    )
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

        let ec = ''
        let appoiment = await db.Booking.findOne({
            where: {
                token: data.token,
                garaId: data.garaId,
                status: 'S1'
            },


        })

        if (appoiment !== null) {

            appoiment.status = 'S2';
            appoiment.save();
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
let readAllCommentService = async (garaId) => {

    try {

        let comment = await db.Comment.findAll({
            where: { garaId: garaId },
            include: [{ model: db.User, as: 'UserComment', attributes: ["userName"] }]
        })
        if (comment) {
            return {
                EM: 'get data successs',
                EC: 0,
                DT: comment
            }
        }
        else {
            return {
                EM: 'data emty',
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
let getAllGaraService = async () => {

    try {

        let comment = await db.Gara.findAll({
            include: [{ model: db.Provind, as: 'provindGaraData' }]
        })
        if (comment) {
            return {
                EM: 'get data successs',
                EC: 0,
                DT: comment
            }
        }
        else {
            return {
                EM: 'data emty',
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
let getAllCarByGaraService = async (garaId) => {
    try {
        let gara = await db.Gara.findAll({
            where: { id: garaId },
            attributes: ["id", "nameGara", "address", "phone", "description", "descriptionHTML", "userId"],
            include: {
                model: db.Car,
                attributes: ["id", "nameCar", "descriptions", "avata"],
                include: [{ model: db.CarCompany, as: 'carCompanyData' }],
                through: { attributes: [] }
            }, raw: true,
            nest: true


        })



        return {
            EM: 'GET DATA SUCCESS',
            EC: 0,
            DT: gara
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
let getGaraWithId = async (id) => {

    try {

        let user = await db.Gara.findOne({
            where: { id: id },
            attributes: ["id", "nameGara", "address", "avata", "phone", "description", "descriptionHTML", "userId", 'rateId', 'contenHTML', 'contenMarkdown'],
            include: [{ model: db.Provind, attributes: ["id", "name"], as: 'provindGaraData' },
            ],

            raw: false,
            nest: true,
        });

        if (user) {

            return {
                EM: 'GET DATA SUCCESS',
                EC: 0,
                DT: user
            }
        }
        else {
            return {
                EM: 'GET DATA SUCCESS',
                EC: 1,
                DT: ''
            }
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
let getCarWithCarId = async (carId) => {
    try {
        let data = await db.Car.findOne({
            where: { id: carId },
            attributes: ["id", "nameCar", "avata", "descriptions"],
            include: [{
                model: db.CarCompany, attributes: ["id", "name"], as: 'carCompanyData',
            }]

        })




        return {
            EM: 'GET DATA SUCCESS',
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
let getCarWithCarCompany = async (carCompany) => {
    try {
        let data = await db.Car.findAll({
            where: { carCompanyId: carCompany },
            attributes: ["id", "nameCar"],
            include: [{
                model: db.CarCompany, attributes: ["id", "name"], as: 'carCompanyData',
            }]

        })



        return {
            EM: 'GET DATA SUCCESS',
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
let getAllCar = async () => {
    try {
        let data = await db.Car.findAll({

            attributes: ["id", "nameCar"],

        })



        return {
            EM: 'GET DATA SUCCESS',
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
let readCarCompany = async () => {
    try {

        let user = await db.CarCompany.findAll({

            attributes: ["id", "name"],


        });

        if (user) {

            return {
                EM: 'GET DATA SUCCESS',
                EC: 0,
                DT: user
            }
        }
        else {
            return {
                EM: 'GET DATA SUCCESS',
                EC: 1,
                DT: ''
            }
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
let getCarWithPage = async (page, limit) => {
    try {
        let offset = (page - 1) * limit
        let { count, rows } = await db.Car.findAndCountAll({
            attributes: ["id", "nameCar", "carCompanyId", "avata", "descriptions"],
            include: { model: db.CarCompany, attributes: ["id", "name", "description", "avata"], as: 'carCompanyData' },
            order: [['id', 'DESC']],
            raw: false,
            nest: true,

            offset: offset,
            limit: limit
        })

        let totalPage = Math.ceil(count / limit)
        let data = {
            totalRow: count,
            totalPage: totalPage,
            user: rows

        }

        if (data) {

            return {
                EM: 'GET DATA SUCCESS',
                EC: 0,
                DT: data
            }
        }
        else {
            return {
                EM: 'GET DATA SUCCESS',
                EC: 1,
                DT: ''
            }
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
let readGarabyProvind = async (provindId) => {
    try {
        if (provindId !== 'ALL') {
            let gara = await db.Gara.findAll({
                where: {
                    provindId: provindId,
                    isDelete: null
                },
                include: {
                    model: db.Car,
                    attributes: ["id", "nameCar", "carCompanyId", 'descriptions'],
                    include: [{ model: db.CarCompany, as: 'carCompanyData' }],
                    through: { attributes: [] }
                },
                raw: true,
                nest: true
            })
            return {
                EM: 'GET DATA SUCCESS',
                EC: 0,
                DT: gara
            }
        }
        else {
            let gara = await db.Gara.findAll({
                where: {

                    isDelete: null
                },
                include: {
                    model: db.Car,
                    attributes: ["id", "nameCar", "carCompanyId", 'descriptions'],
                    include: [{ model: db.CarCompany, as: 'carCompanyData' }],
                    through: { attributes: [] }
                },
                raw: true,
                nest: true
            })
            return {
                EM: 'GET DATA SUCCESS',
                EC: 0,
                DT: gara
            }
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

let readGarabyProvindCarCompanyCar = async (provindId, carCompanyId, carId) => {
    try {
        if (+provindId === 0) {
            let gara = await db.Gara.findAll({
                where: {

                    isDelete: null
                },
                include: {
                    model: db.Car,
                    attributes: ["id", "nameCar", "carCompanyId", 'descriptions'],
                    include: [{ model: db.CarCompany, as: 'carCompanyData' }],
                    through: { attributes: [] }
                },
                raw: true,
                nest: true
            })
            let data = []

            gara.map((item, index) => {
                if (item.Cars.carCompanyData.id === +carCompanyId || +carCompanyId === 0) {
                    data.push(item)
                }
            })
            let datafinal = []
            data.map((item, index) => {
                if (item.Cars.id === +carId || +carId === 0) {
                    datafinal.push(item)
                }
            })
            console.log(datafinal)
            return {
                EM: 'GET DATA SUCCESS',
                EC: 0,
                DT: datafinal
            }

        } else {
            let gara = await db.Gara.findAll({
                where: {
                    provindId: provindId,
                    isDelete: null
                },
                include: {
                    model: db.Car,
                    attributes: ["id", "nameCar", "carCompanyId", 'descriptions'],
                    include: [{ model: db.CarCompany, as: 'carCompanyData' }],
                    through: { attributes: [] }
                },
                raw: true,
                nest: true
            })
            console.log(+provindId)
            let data = []
            gara.map((item, index) => {

                if (item.Cars.carCompanyData.id === +carCompanyId || +carCompanyId === 0) {
                    data.push(item)
                }
            })
            let datafinal = []
            data.map((item, index) => {
                if (item.Cars.id === +carId || +carId === 0) {
                    datafinal.push(item)
                }
            })

            return {
                EM: 'GET DATA SUCCESS',
                EC: 0,
                DT: datafinal
            }

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
let getAllDayService = async (garaId) => {
    try {

        let gara = await db.Schedule.findAll({
            where: {
                garaId: garaId,
                isDelete: null
            },
            attributes: ["id", "date", "timeType", 'maxOrder', 'currenOrder'],

        })
        return {
            EM: 'GET DATA SUCCESS',
            EC: 0,
            DT: gara
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

module.exports = {
    createRegisterUser, getGender, readTopGaraService, readAllPayment, readAllPrice, readAllService, readScheduleByDay, readPricePaymentService,
    readServiceCarService, createBookingService, vetyfyBookingService, getAllGaraService, getAllCarByGaraService, getGaraWithId, readProvindservice,
    getCarWithCarId, getCarWithCarCompany, getAllCar, readCarCompany, getCarWithPage, readAllCommentService, readGarabyProvind, readGarabyProvindCarCompanyCar,
    getAllDayService

}