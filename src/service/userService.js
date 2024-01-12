import bcrypt from 'bcryptjs';
import db from '../models/index';
import { getGroupWithRole } from './JWTservice'
import { createJWT } from '../midderWare/JWTaction'
import EmailService from './EmailService'
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
const { Op } = require("sequelize");
var salt = bcrypt.genSaltSync(10);
let buidUrlEmail = (garaId, token) => {
    let resf = `${process.env.REACT_URL}/vetyfy-booking?token=${token}&garaId=${garaId}`
    return resf
}
const checkemailIsExit = async (email) => {
    let data = await db.User.findOne({ where: { email: email, isDelete: 0 } })

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

let LoginUser = async (rawData) => {

    try {
        let checkMail = await checkemailIsExit(rawData.email)
        if (checkMail === false) {
            let datamail = await db.User.findOne({ where: { email: rawData.email, isDelete: 0 } })
            if (datamail.groupId === 5) {
                return {
                    EM: 'khach da dat lich nhung chua co tai khoan',
                    EC: 3,
                    DT: ''
                }
            }
            else {

                let checkpass = checkPassword(rawData.password, datamail.password)
                if (checkpass) {
                    let role = await getGroupWithRole(datamail)

                    let payload = {
                        email: datamail.email,
                        userName: datamail.userName,
                        role: role,
                        id: datamail.id

                    }
                    let token = await createJWT(payload)

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

let createRegisterGara = async (rawUserData) => {

    try {
        let checkMail = await checkemailIsExit(rawUserData.emailUser)
        let gara = await db.Gara.findOne({
            where: {
                userId: rawUserData.id,
                status: 'S1'
            }
        })
        if (checkMail === false && gara === null) {
            await db.Gara.create({
                nameGara: rawUserData.nameGara,

                contenMarkdown: rawUserData.descriptionMarkDown,
                contenHTML: rawUserData.descriptionHTML,
                address: rawUserData.address,
                provindId: rawUserData.provindId,
                avata: rawUserData.avata,
                phone: rawUserData.phone,
                description: rawUserData.description,
                userId: rawUserData.id,
                isDelete: 0,
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












let getAllOrderService = async (userId) => {

    try {
        let booking = await db.Booking.findAll({
            where: { userId: userId, isDelete: 0 },
            attributes: ["id", "userId", "garaid", "carId", "timeType", "serviceId", "date", "status"],
            include: [
                {
                    model: db.User, as: 'bookingData', attributes: ["id", "userName", "email", "address"]
                },
                {
                    model: db.Gara, as: 'bookingDataGara', attributes: ["id", "nameGara", "address", "provindId", "phone"],
                    include: [{ model: db.Provind, as: 'provindGaraData' }]
                },
                {
                    model: db.Time, as: 'timeDataBooking', attributes: ["id", "timValue"]
                },
                {
                    model: db.Car, as: 'carBookingData', attributes: ["id", "nameCar", "carCompanyId", "descriptions",],
                    include: { model: db.CarCompany, as: "carCompanyData" }
                },
                {
                    model: db.Service, as: 'serviceBookingData', attributes: ["id", "name", "description"]
                },
                {
                    model: db.StatusBooking, as: 'statusBooking'
                },
                { model: db.Price, as: 'PriceBookingData' }
            ],
            order: [
                ['id', 'DESC'],
            ],
            raw: true,
            nest: true


        })

        booking.map(async (item) => {
            let fomatDate = moment(new Date()).startOf('day').unix()
            if (+item.date < fomatDate && item.status !== 'S3' && item.status !== 'S4' && item.status !== 'S5') {

                let booking2 = await db.Booking.findOne({
                    where: { userId: userId, id: item.id },

                })
                console.log(booking2.id)
                booking2.status = 'S0'
                await booking2.save()
            }
        })



        if (booking) {

            return {
                EM: 'GET DATA SUCCESS',
                EC: 0,
                DT: booking
            }
        }

        else {
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
let createCommentService = async (data) => {

    try {

        let comment = await db.Comment.create({
            isDelete: 0,
            comment: data.comment,
            garaId: data.garaId,
            userId: data.userId,
            rate: data.rate
        })

        if (comment) {
            let gara = await db.Gara.findOne({ where: { id: data.garaId } })
            if (gara) {
                if (gara.rateId === null) {
                    gara.rateId = data.rate
                }
                else {
                    gara.rateId = +((gara.rateId + data.rate) / 2)

                }

                await gara.save()
                let booking = await db.Booking.findOne({
                    where: {
                        userId: data.userId,
                        garaid: data.garaId,
                        carId: data.carId,
                        timeType: data.timeType,
                        serviceId: data.serviceId,
                        date: data.date,
                        status: 'S4'
                    }
                })
                if (booking) {
                    booking.status = 'S5'
                    await booking.save()
                    return {
                        EM: 'danh gia thanh cong',
                        EC: 0,
                        DT: ''
                    }
                }
                else {
                    return {
                        EM: 'thong tin don hang khong chinh xac',
                        EC: 3,
                        DT: ''
                    }
                }
            }
            else {
                return {
                    EM: 'thong tin gara khong chinh xac',
                    EC: 2,
                    DT: ''
                }
            }

        }
        else {
            return {
                EM: 'comment that bai',
                EC: 1,
                DT: ''
            }
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

let searchOrderService = async (gara, status, user) => {

    try {
        let data = await db.Booking.findAll({
            where: {
                userId: +user,
                isDelete: {
                    [Op.ne]: 1
                },



            },
            attributes: ["id", "userId", "garaid", "carId", "timeType", "serviceId", "date", "status"],
            include: [
                {
                    model: db.User, as: 'bookingData', attributes: ["id", "userName", "email", "address"]
                },
                {
                    model: db.Gara, as: 'bookingDataGara', attributes: ["id", "nameGara", "address", "provindId", "phone"],
                    include: [{ model: db.Provind, as: 'provindGaraData' }]
                },
                {
                    model: db.Time, as: 'timeDataBooking', attributes: ["id", "timValue"]
                },
                {
                    model: db.Car, as: 'carBookingData', attributes: ["id", "nameCar", "carCompanyId", "descriptions",],
                    include: { model: db.CarCompany, as: "carCompanyData" }
                },
                {
                    model: db.Service, as: 'serviceBookingData', attributes: ["id", "name", "description"]
                },
                {
                    model: db.StatusBooking, as: 'statusBooking'
                },
            ], raw: true,
            nest: true

        });

        let results = data.filter(item => item.garaid === +gara || +gara === 0)

        let results2 = results.filter(item => item.status === status || +status === 0)


        return {
            EM: 'GET DATA SUCCESS',
            EC: 0,
            DT: results2
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
let getUserbyIdService = async (userIdInput) => {

    try {
        let user = await db.User.findOne({
            where: {
                isDelete: {
                    [Op.ne]: 1
                },
                id: userIdInput

            },
            attributes: ['id', 'userName', 'email', 'phone', 'gender', 'address', 'groupId', 'avata'],
            include: [
                {
                    model: db.Gender, as: 'genderDataUser'
                },
                {
                    model: db.Group, as: 'groupData'
                },
                {
                    model: db.Gara, as: 'userGara'
                },
                { model: db.HandBook, as: 'StaffHandbookData' }
            ]
        })
        return {
            EM: 'getdata succes',
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
let chanepassService = async (datainput) => {

    try {


        let data = await db.User.findOne({
            where: {
                isDelete: 0,
                email: datainput.email,

            },


        })
        console.log('email: ', datainput)
        let checkpass = checkPassword(datainput.oldpassword, data.password)

        if (checkpass) {
            let hashPassword = hashUserPassword(datainput.newPassword)
            data.password = hashPassword
            await data.save()



            return {
                EM: 'chane successs',
                EC: 0,
                DT: ''
            }

        }
        else {
            return {
                EM: 'wrong passworld',
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
module.exports = {
    LoginUser, createRegisterGara,
    getAllOrderService, createCommentService, searchOrderService, getUserbyIdService, chanepassService
}