import db from "../models";
import bcrypt from 'bcryptjs';
import _ from "lodash";
import EmailService from './EmailService'
import schedule from "../models/schedule";
import moment from 'moment';
const { Op, where } = require("sequelize");



let readInfoGaraService = async (id) => {

    try {

        let user = await db.Gara.findOne({
            where: { userId: id },
            attributes: ["id", "nameGara", "address", "phone", "description", "contenHTML", "avata", "userId", "rateId", "status"],
            include: [{ model: db.Provind, as: 'provindGaraData' }]


            ,

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




let registerCartoGaraService = async (rawdata) => {

    let garaCar = await db.Gara_Car.findOne({
        where: {
            garaId: rawdata.garaId,
            carId: rawdata.carId,
        }
    })
    try {
        if (garaCar === null) {
            await db.Gara_Car.create({
                garaId: rawdata.garaId,
                carId: rawdata.carId,
            }).then(async function (data) {
                let user = await db.Gara_Car.findOne({
                    where: {
                        garaId: rawdata.garaId,
                        carId: rawdata.carId
                    },
                    attributes: ['id'],
                    raw: true

                }).then(async function (data) {
                    let dataaa = await db.Service_Gara_Car.findOne({
                        where: {
                            serviceId: rawdata.serviceId,
                            garaCarId: data.id,
                        }
                    })
                    if (dataaa) {
                        dataaa.priceId = rawdata.priceId;
                        dataaa.paymentId = rawdata.paymentId
                        dataaa.save()
                    }
                    else {
                        await db.Service_Gara_Car.create({
                            serviceId: rawdata.serviceId,
                            garaCarId: data.id,
                            priceId: rawdata.priceId,
                            paymentId: rawdata.paymentId,
                        })
                    }
                }
                )



            })
            return {
                EM: 'createa success',
                EC: 0,
                DT: ''
            }


        }

        else {
            await db.Gara_Car.findOne({
                where: {
                    garaId: rawdata.garaId,
                    carId: rawdata.carId,
                },
                attributes: ['id'],
                raw: true

            }).then(async function (data) {
                let dataaa = await db.Service_Gara_Car.findOne({
                    where: {
                        serviceId: rawdata.serviceId,
                        garaCarId: data.id,
                    }
                })
                if (dataaa) {
                    dataaa.priceId = rawdata.priceId;
                    dataaa.paymentId = rawdata.paymentId
                    dataaa.save()
                }
                else {
                    await db.Service_Gara_Car.create({
                        serviceId: rawdata.serviceId,
                        garaCarId: data.id,
                        priceId: rawdata.priceId,
                        paymentId: rawdata.paymentId,
                    })
                }



            });
            return {
                EM: 'update success',
                EC: 0,
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
let readAllTimeService = async () => {
    try {
        let data = await db.Time.findAll({

            attributes: ["id", "timValue"],
            raw: true


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
let createBulkScheduleService = async (data) => {

    try {


        let dataschedule = data.arrSchedule

        let exiting = await db.Schedule.findAll({
            where: {
                garaId: data.garaId, date: data.fomatDate
            }, attributes: ['date', 'timeType', 'garaId'], raw: true
        })


        let toCreate = _.differenceWith(dataschedule, exiting, (a, b) => {
            return +a.timeType === +b.timeType && +a.date === +b.date
        })

        const results = exiting.filter(({ date: id1, timeType: id11 }) => !dataschedule.some(({ date: id2, timeType: id22 }) => +id2 === +id1 && +id22 === +id11));



        let tocreate2 = []; // new Array
        toCreate.map(item => tocreate2.push({ garaId: data.garaId, date: item.date, timeType: item.timeType, maxOrder: +item.maxOrder, currenOrder: 0 }))

        if (tocreate2 && tocreate2.length > 0) {
            await db.Schedule.bulkCreate(tocreate2);
        }
        if (results && results.length > 0) {
            for (let i = 0; i < results.length; i++) {

                await db.Schedule.destroy({
                    where: {
                        date: results[i].date,
                        timeType: results[i].timeType,
                        garaId: results[i].garaId
                    },
                });

            }
        }
        console.log('da co', exiting)
        console.log('dua len', dataschedule)
        console.log('can luu', tocreate2)
        console.log('can xoa', results)
        return {
            EM: 'create success',
            EC: 0,
            DT: ''
        }

    }
    catch (e) {
        console.log(e)
        return {
            EM: 'SOMTHING WRONG',
            EC: -1,
            DT: []
        }
    }

}

let deletePickCarService = async (data) => {
    try {

        let gara = await db.Gara_Car.findOne({
            where: { garaId: data.garaId, carId: data.carId },
            attributes: ['id']

        }).then(async function (data1) {

            let user = await db.Service_Gara_Car.findOne({
                where: {
                    garaCarId: data1.dataValues.id,
                    serviceId: data.serviceId
                },



            })
            if (user) {
                user.destroy()



                let user2 = await db.Service_Gara_Car.findOne({
                    where: {
                        garaCarId: data1.dataValues.id,

                    }
                })
                if (user2 === null) {
                    let gara = await db.Gara_Car.findOne({
                        where: { garaId: data.garaId, carId: data.carId },
                    })
                    gara.destroy()
                }
            }

            else {
                return {
                    EM: 'update database succes',
                    EC: 0,
                    DT: ''
                }

            }

        })
        return {
            EM: 'sua thanh cong',
            EC: 0,
            DT: ''
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

let getListBookingService = async (garaId, date) => {
    try {
        let booking = await db.Booking.findAll({
            where: { garaId: garaId, date: date, status: 'S2' },
            attributes: ["id", "userId", "garaid", "carId", "timeType", "serviceId", "date", "status"],
            include: [
                {
                    model: db.User, as: 'bookingData', attributes: ["id", "userName", "email", "address"]

                },
                {
                    model: db.Gara, as: 'bookingDataGara', attributes: ["id", "nameGara", "address", "provindId", "phone"]
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
            ], raw: true,
            nest: true


        })
        let booking2 = await db.Booking.findAll({
            where: { garaId: garaId, status: 'S2' },
            attributes: ["id", "userId", "garaid", "carId", "timeType", "serviceId", "date", "status"],


        })
        let currendate = moment(new Date()).startOf('day').unix()
        for (let i = 0; i < booking2.length; i++) {
            if (booking2[i].date < currendate) {

                booking2[i].status = 'S0'
                booking2[i].save()

            }
        }

        if (booking) {
            return {
                EM: 'GET DATA SUCCESS',
                EC: 0,
                DT: booking
            }

        }
        else {
            return {
                EM: 'no customer in this day',
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
let comfimeBookingService = async (data) => {
    try {
        let schedule = await db.Schedule.findOne({
            where: { garaId: data.garaId, date: data.date, timeType: data.timeType }

        })

        if (schedule) {
            schedule.currenOrder = +schedule.currenOrder + 1
            schedule.save()

            if (+schedule.currenOrder - 1 === +schedule.maxOrder) {

                schedule.currenOrder = +schedule.currenOrder - 1
                schedule.save()
                return {
                    EM: 'max limit car per time',
                    EC: 2,
                    DT: ''
                }
            }

            else {
                let booking = await db.Booking.findOne({
                    where: { garaId: data.garaId, date: data.date, status: 'S2', userId: data.userId, carId: data.carId, timeType: data.timeType, serviceId: data.serviceId },
                })

                if (booking) {
                    booking.status = 'S3'
                    booking.save()
                    await EmailService.sendcomfemEmail({
                        reciverEmail: data.email,
                        time: data.time,

                    })

                    return {
                        EM: 'update DATA SUCCESS',
                        EC: 0,
                        DT: ''
                    }

                }
                else {
                    return {
                        EM: 'update fail',
                        EC: 1,
                        DT: ''
                    }
                }
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
let getListOrderService = async (garaId, date) => {
    try {
        let booking = await db.Booking.findAll({
            where: { garaId: garaId, date: date, status: 'S3' },
            attributes: ["id", "userId", "garaid", "carId", "timeType", "serviceId", "date", "status"],
            include: [
                {
                    model: db.User, as: 'bookingData', attributes: ["id", "userName", "email", "address"]
                },
                {
                    model: db.Gara, as: 'bookingDataGara', attributes: ["id", "nameGara", "address", "provindId", "phone"]
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
            ], raw: true,
            nest: true


        })
        let booking2 = await db.Booking.findAll({
            where: { garaId: garaId, date: date, status: 'S4' },
            attributes: ["id", "userId", "garaid", "carId", "timeType", "serviceId", "date", "status"],
            include: [
                {
                    model: db.User, as: 'bookingData', attributes: ["id", "userName", "email", "address"]
                },
                {
                    model: db.Gara, as: 'bookingDataGara', attributes: ["id", "nameGara", "address", "provindId", "phone"]
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
            ], raw: true,
            nest: true


        })
        let booking3 = await db.Booking.findAll({
            where: { garaId: garaId, date: date, status: 'S0' },
            attributes: ["id", "userId", "garaid", "carId", "timeType", "serviceId", "date", "status"],
            include: [
                {
                    model: db.User, as: 'bookingData', attributes: ["id", "userName", "email", "address"]
                },
                {
                    model: db.Gara, as: 'bookingDataGara', attributes: ["id", "nameGara", "address", "provindId", "phone"]
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
            ], raw: true,
            nest: true


        })
        if (booking2 && booking) {
            Array.prototype.push.apply(booking2, booking);
            Array.prototype.push.apply(booking3, booking2);
            return {
                EM: 'GET DATA SUCCESS',
                EC: 0,
                DT: booking3
            }

        }
        else {
            return {
                EM: 'no customer in this day',
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
let finishOrderService = async (data) => {
    try {


        let booking = await db.Booking.findOne({
            where: { garaId: data.garaId, date: data.date, status: 'S3', userId: data.userId, carId: data.carId, timeType: data.timeType, serviceId: data.serviceId },
        })

        if (booking) {
            booking.status = 'S4'
            booking.save()
            await EmailService.sendcomfemEmail({
                reciverEmail: data.email,
                time: data.time,

            })

            return {
                EM: 'update DATA SUCCESS',
                EC: 0,
                DT: ''
            }

        }
        else {
            return {
                EM: 'update fail',
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
let canserOrderService = async (data) => {
    try {


        let booking = await db.Booking.findOne({
            where: { garaId: data.garaId, date: data.date, status: 'S3', userId: data.userId, carId: data.carId, timeType: data.timeType, serviceId: data.serviceId },
        })

        if (booking) {
            booking.status = 'S0'
            booking.save()
            await EmailService.sendcomfemEmail({
                reciverEmail: data.email,
                time: data.time,

            })

            return {
                EM: 'update DATA SUCCESS',
                EC: 0,
                DT: ''
            }

        }
        else {
            return {
                EM: 'update fail',
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
let updateGaraService = async (data) => {
    try {
        let isStaff = await db.User.findOne({
            where: {
                id: data.id
            }
        })
        if (isStaff.groupId === 3 || isStaff.groupId === 4) {
            let gara = await db.Gara.findOne({
                where: {
                    id: data.garaId
                }
            })
            if (gara) {
                gara.nameGara = data.nameGara
                gara.contenHTML = data.contenHTML

                gara.contenMarkdown = data.contenMarkdown
                gara.address = data.addressGara

                gara.provindId = data.provindId
                gara.avata = data.avata
                gara.phone = data.phone
                gara.status = 'S2'
                gara.description = data.descpistion

                gara.save()
                return {
                    EM: 'update by staff or admin success',
                    EC: 0,
                    DT: ''
                }
            }
            else {
                return {
                    EM: 'cant find the gara',
                    EC: 1,
                    DT: []
                }
            }
        } else {
            let gara = await db.Gara.findOne({
                where: {
                    id: data.garaId
                }
            })
            if (gara) {
                gara.nameGara = data.nameGara
                gara.contenHTML = data.contenHTML

                gara.contenMarkdown = data.contenMarkdown
                gara.address = data.address

                gara.provindId = data.provindId
                gara.avata = data.avata
                gara.phone = data.phone
                gara.status = 'S1'

                gara.description = data.descpistion
                gara.save()
                return {
                    EM: 'update by gara',
                    EC: 0,
                    DT: ''
                }
            }
            else {
                return {
                    EM: 'cant find the gara',
                    EC: 1,
                    DT: []
                }
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
module.exports = {
    readInfoGaraService, registerCartoGaraService, readAllTimeService, createBulkScheduleService
    , deletePickCarService, getListBookingService, comfimeBookingService, getListOrderService, finishOrderService, canserOrderService,
    updateGaraService
}