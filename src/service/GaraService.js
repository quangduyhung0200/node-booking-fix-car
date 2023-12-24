import db from "../models";
import bcrypt from 'bcryptjs';
import _ from "lodash";
const { Op, where } = require("sequelize");



let readInfoGaraService = async (email) => {

    try {

        let user = await db.User.findOne({
            where: { email: email },
            attributes: ["id"],
            include: [{
                model: db.Gara, attributes: ["id", "nameGara", "address", "phone", "description", "descriptionHTML", "avata"], as: 'userGara',
                include: [{ model: db.Provind, as: 'provindGaraData' }]
            },

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
let getAllCar = async (carCompany) => {
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
let getCarWithCarCompany = async (carCompany) => {
    try {
        let data = await db.Car.findAll({
            where: { carCompanyId: carCompany },
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

let getCarWithCarId = async (carId) => {
    try {
        let data = await db.Car.findOne({
            where: { id: carId },
            attributes: ["id", "nameCar", "avata", "descriptions"],
            include: [{
                model: db.CarCompany, attributes: ["id", "name"], as: 'carCompanyData',
            }]

        })
        console.log(carId)



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



        console.log(data)
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

        console.log('check data:', data)
        let dataschedule = data.arrSchedule

        let exiting = await db.Schedule.findAll({
            where: {
                garaId: data.garaId, date: data.fomatDate
            }, attributes: ['date', 'timeType', 'garaId'], raw: true
        })


        console.log('aaaaaaaaaa:', dataschedule)
        console.log('bbbbbbbbbb:', exiting)
        let toCreate = _.differenceWith(dataschedule, exiting, (a, b) => {
            return +a.timeType === +b.timeType && +a.date === +b.date
        })

        console.log('ccccccccc:', toCreate)
        let tocreate2 = []; // new Array
        toCreate.map(item => tocreate2.push({ garaId: data.garaId, date: item.date, timeType: item.timeType }))
        console.log(tocreate2)
        if (tocreate2 && tocreate2.length > 0) {
            await db.Schedule.bulkCreate(tocreate2);
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
module.exports = {
    readInfoGaraService, getCarWithCarCompany, getAllCar, getCarWithCarId, registerCartoGaraService, readAllTimeService, createBulkScheduleService
}