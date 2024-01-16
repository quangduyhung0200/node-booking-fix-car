import db from "../models";
import bcrypt from 'bcryptjs';
import _ from "lodash";
import EmailService from './EmailService'
import schedule from "../models/schedule";
import moment from 'moment';
import booking from "../models/booking";
const { Op, where } = require("sequelize");



let readInfoGaraService = async (id) => {

    try {
        console.log(id)
        let user = await db.Gara.findOne({
            where: { userId: id, isDelete: 0 },
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
    console.log(rawdata)
    let garaCar = await db.Gara_Car.findOne({
        where: {
            garaId: rawdata.garaId,
            carId: rawdata.carId,
            isDelete: 0
        }
    })
    try {
        if (garaCar === null) {
            console.log('aaaaaaaaa')
            await db.Gara_Car.create({
                garaId: rawdata.garaId,
                carId: rawdata.carId,
                isDelete: 0
            }).then(async function (data) {
                let user = await db.Gara_Car.findOne({
                    where: {
                        garaId: rawdata.garaId,
                        carId: rawdata.carId,
                        isDelete: 0
                    },
                    attributes: ['id'],
                    raw: true

                }).then(async function (data) {
                    let dataaa = await db.Service_Gara_Car.findOne({
                        where: {
                            serviceId: rawdata.serviceId,
                            garaCarId: data.id,
                            isDelete: 0
                        }
                    })
                    if (dataaa) {
                        dataaa.priceId = rawdata.priceId;
                        dataaa.paymentId = rawdata.paymentId
                        await dataaa.save()
                    }
                    else {
                        await db.Service_Gara_Car.create({
                            serviceId: rawdata.serviceId,
                            garaCarId: data.id,
                            priceId: rawdata.priceId,
                            paymentId: rawdata.paymentId,
                            isDelete: 0
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
                    isDelete: 0
                },
                attributes: ['id'],
                raw: true

            }).then(async function (data) {

                let dataaa = await db.Service_Gara_Car.findOne({
                    where: {
                        serviceId: rawdata.serviceId,
                        garaCarId: data.id,
                        isDelete: 0
                    }
                })
                if (dataaa) {
                    dataaa.priceId = rawdata.priceId;
                    dataaa.paymentId = rawdata.paymentId
                    await dataaa.save()
                }
                else {
                    await db.Service_Gara_Car.create({
                        serviceId: rawdata.serviceId,
                        garaCarId: data.id,
                        priceId: rawdata.priceId,
                        paymentId: rawdata.paymentId,
                        isDelete: 0
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
            where: { isDelete: 0 },
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
                garaId: data.garaId, date: data.fomatDate,
                isDelete: 0
            }, attributes: ['date', 'timeType', 'garaId'], raw: true
        })


        let toCreate = _.differenceWith(dataschedule, exiting, (a, b) => {
            return +a.timeType === +b.timeType && +a.date === +b.date
        })

        const results = exiting.filter(({ date: id1, timeType: id11 }) => !dataschedule.some(({ date: id2, timeType: id22 }) => +id2 === +id1 && +id22 === +id11));



        let tocreate2 = []; // new Array
        toCreate.map(item => tocreate2.push({ garaId: data.garaId, date: item.date, timeType: item.timeType, maxOrder: +item.maxOrder, currenOrder: 0, isDelete: 0 }))

        if (tocreate2 && tocreate2.length > 0) {
            await db.Schedule.bulkCreate(tocreate2);
        }
        if (results && results.length > 0) {
            for (let i = 0; i < results.length; i++) {

                let res = await db.Schedule.findOne({
                    where: {
                        date: results[i].date,
                        timeType: results[i].timeType,
                        garaId: results[i].garaId,
                        isDelete: 0
                    },
                });
                if (res) {
                    res.isDelete = 1
                    await res.save()
                }

            }
        }

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
            where: { garaId: data.garaId, carId: data.carId, isDelete: 0 },
            attributes: ['id']

        }).then(async function (data1) {

            let user = await db.Service_Gara_Car.findOne({
                where: {
                    garaCarId: data1 ? data1.dataValues.id : 0,
                    serviceId: data.serviceId,
                    isDelete: 0
                },



            })
            console.log(user)
            if (user) {
                user.isDelete = 1
                await user.save()



                let user2 = await db.Service_Gara_Car.findOne({
                    where: {
                        garaCarId: data1 ? data1.dataValues.id : 0,
                        isDelete: 0

                    }
                })
                if (user2 === null) {
                    let gara = await db.Gara_Car.findOne({
                        where: { garaId: data.garaId, carId: data.carId, isDelete: 0 },
                    })
                    gara.isDelete = 1
                    await gara.save()
                    return {
                        EM: 'sua thanh cong',
                        EC: 0,
                        DT: ''
                    }
                }
                else {
                    return {
                        EM: 'no car indatebase',
                        EC: 1,
                        DT: ''
                    }
                }
            }

            else {

                return {
                    EM: 'no car indatebase',
                    EC: 1,
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
        if (date === 'ALL') {

            let booking = await db.Booking.findAll({
                where: { garaId: garaId, status: 'S2', isDelete: 0 },
                attributes: ["id", "userId", "garaid", "carId", "timeType", "serviceId", "date", "status", "reson", "priceId"],
                include: [
                    {
                        model: db.User, as: 'bookingData', attributes: ["id", "userName", "email", "address", "phone"]

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
                    { model: db.Price, as: 'PriceBookingData' },

                    {
                        model: db.StatusBooking, as: 'statusBooking'
                    }
                ], raw: true,
                nest: true


            })
            let booking2 = await db.Booking.findAll({
                where: { status: ['S1', 'S2'], isDelete: 0 },
                attributes: ["id", "userId", "garaid", "carId", "timeType", "serviceId", "date", "status"],


            })

            booking2.map(async (item) => {
                let fomatDate = moment(new Date()).startOf('day').unix()
                if (+item.date < fomatDate && item.status !== 'S3' && item.status !== 'S4' && item.status !== 'S5') {

                    let booking3 = await db.Booking.findOne({
                        where: { id: item.id, isDelete: 0 },

                    })

                    booking3.status = 'S0'
                    await booking3.save()
                }
            })
            let fomatDate = moment(new Date()).startOf('day').unix()
            booking.filter((item) => {
                item.data >= fomatDate
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
                    EM: 'no customer in this day',
                    EC: 1,
                    DT: ''
                }
            }

        } else {

            let booking = await db.Booking.findAll({
                where: { garaId: garaId, status: 'S2', date: date },
                attributes: ["id", "userId", "garaid", "carId", "timeType", "serviceId", "date", "status", "reson"],
                include: [
                    {
                        model: db.User, as: 'bookingData', attributes: ["id", "userName", "email", "address", "phone"]

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
                where: { status: ['S1', 'S2'], isDelete: 0 },
                attributes: ["id", "userId", "garaid", "carId", "timeType", "serviceId", "date", "status"],


            })

            booking2.map(async (item) => {
                let fomatDate = moment(new Date()).startOf('day').unix()
                if (+item.date < fomatDate && item.status !== 'S3' && item.status !== 'S4' && item.status !== 'S5') {

                    let booking3 = await db.Booking.findOne({
                        where: { id: item.id, isDelete: 0 },

                    })
                    console.log(booking3.id)
                    booking3.status = 'S0'
                    await booking3.save()
                }
            })
            let fomatDate = moment(new Date()).startOf('day').unix()
            booking.filter((item) => {
                item.data >= fomatDate
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
                    EM: 'no customer in this day',
                    EC: 1,
                    DT: ''
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
let comfimeBookingService = async (data) => {
    try {
        let schedule = await db.Schedule.findOne({
            where: { garaId: data.garaId, date: data.date, timeType: data.timeType, isDelete: 0 }

        })

        if (schedule) {
            schedule.currenOrder = +schedule.currenOrder + 1
            schedule.save()

            if (+schedule.currenOrder - 1 === +schedule.maxOrder) {

                schedule.currenOrder = +schedule.currenOrder - 1
                await schedule.save()
                return {
                    EM: 'max limit car per time',
                    EC: 2,
                    DT: ''
                }
            }

            else {
                let booking = await db.Booking.findOne({
                    where: { garaId: data.garaId, date: data.date, status: 'S2', userId: data.userId, carId: data.carId, timeType: data.timeType, serviceId: data.serviceId, isDelete: 0 },
                    include: [{ model: db.Gara, as: 'bookingDataGara', attributes: ['nameGara', 'address', 'phone'] }]
                })

                if (booking) {
                    booking.status = 'S3'
                    await booking.save()
                    await EmailService.sendcomfemEmail({
                        reciverEmail: data.email,
                        time: data.time,
                        nameGara: booking.bookingDataGara.nameGara,
                        addressGara: booking.bookingDataGara.address,
                        phoneGara: booking.bookingDataGara.phone

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

        if (date === 'ALL') {
            let booking = await db.Booking.findAll({
                where: { garaId: garaId, isDelete: 0 },
                attributes: ["id", "userId", "garaid", "carId", "timeType", "serviceId", "date", "status", 'priceId'],
                include: [
                    {
                        model: db.User, as: 'bookingData', attributes: ["id", "userName", "email", "address", "phone"]
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
                    {
                        model: db.StatusBooking, as: 'statusBooking'
                    },
                    { model: db.Price, as: 'PriceBookingData' }
                ], raw: true,
                nest: true


            })


            return {
                EM: 'GET DATA SUCCESS',
                EC: 0,
                DT: booking
            }
        }
        else {
            let booking = await db.Booking.findAll({
                where: { garaId: garaId, date: date, isDelete: 0 },
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
                    {
                        model: db.StatusBooking, as: 'statusBooking'
                    },
                ], raw: true,
                nest: true


            })


            return {
                EM: 'GET DATA SUCCESS',
                EC: 0,
                DT: booking
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
            where: { garaId: data.garaId, date: data.date, status: 'S3', userId: data.userId, carId: data.carId, timeType: data.timeType, serviceId: data.serviceId, isDelete: 0 },
            include: [{ model: db.Gara, as: 'bookingDataGara', attributes: ['nameGara', 'address', 'phone'] }]
        })

        if (booking) {
            booking.status = 'S4'
            await booking.save()
            await EmailService.senddfinishBooking({
                reciverEmail: data.email,
                time: data.time,
                nameGara: booking.bookingDataGara.nameGara,
                addressGara: booking.bookingDataGara.address,
                phoneGara: booking.bookingDataGara.phone

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
            where: { garaId: data.garaId, date: data.date, status: 'S3', userId: data.userId, carId: data.carId, timeType: data.timeType, serviceId: data.serviceId, isDelete: 0 },
            include: [{ model: db.Gara, as: 'bookingDataGara', attributes: ['nameGara', 'address', 'phone'] }]
        })

        if (booking) {
            booking.status = 'S4'
            await booking.save()
            await EmailService.senddcenserbooking({
                reciverEmail: data.email,
                time: data.time,
                nameGara: booking.bookingDataGara.nameGara,
                addressGara: booking.bookingDataGara.address,
                phoneGara: booking.bookingDataGara.phone

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
                id: data.id,
                isDelete: 0
            }
        })
        if (isStaff.groupId === 3 || isStaff.groupId === 4) {
            let gara = await db.Gara.findOne({
                where: {
                    id: data.garaId,
                    isDelete: 0
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
                gara.status = 'S1'
                gara.description = data.descpistion

                await gara.save()
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
                    id: data.garaId,
                    isDelete: 0
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
                gara.status = 'S1'
                gara.isDelete = 0
                gara.description = data.descpistion
                await gara.save()
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
let canserBookingService = async (data) => {
    try {


        let booking = await db.Booking.findOne({
            where: { garaId: data.garaId, date: data.date, status: 'S2', userId: data.userId, carId: data.carId, timeType: data.timeType, serviceId: data.serviceId, isDelete: 0 },
            include: [{ model: db.Gara, as: 'bookingDataGara', attributes: ['nameGara', 'address', 'phone'] }]
        })

        if (booking) {
            booking.status = 'S0'
            await booking.save()
            await EmailService.senddeniceBooking({
                reciverEmail: data.email,
                time: data.time,
                nameGara: booking.bookingDataGara.nameGara,
                addressGara: booking.bookingDataGara.address,
                phoneGara: booking.bookingDataGara.phone

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
let getprofitService = async (garaId, date) => {
    try {

        if (date === 'ALL') {

            let booking = await db.Booking.findAll({
                where: { garaId: garaId, isDelete: 0 },
                attributes: ["id", "userId", "garaid", "carId", "timeType", "serviceId", "date", "status"],
                include: [
                    {
                        model: db.User, as: 'bookingData', attributes: ["id", "userName", "email", "address", "phone"]
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

                    {
                        model: db.StatusBooking, as: 'statusBooking'
                    },
                    {
                        model: db.Price, as: 'PriceBookingData'
                    },
                ], raw: true,
                nest: true


            })


            return {
                EM: 'GET DATA SUCCESS',
                EC: 0,
                DT: booking
            }

        }
        else {

            let booking = await db.Booking.findAll({
                where: { garaId: garaId, isDelete: 0, date: date },
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
                    {
                        model: db.StatusBooking, as: 'statusBooking'
                    },
                    {
                        model: db.Price, as: 'PriceBookingData'
                    },
                ], raw: true,
                nest: true


            })


            return {
                EM: 'GET DATA SUCCESS',
                EC: 0,
                DT: booking
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
    updateGaraService, canserBookingService, getprofitService
}