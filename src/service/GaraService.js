import db from "../models";
import bcrypt from 'bcryptjs';
import _ from "lodash";
const { Op, where } = require("sequelize");



let readInfoGaraService = async (id) => {

    try {

        let user = await db.Gara.findOne({
            where: { userId: id },
            attributes: ["id", "nameGara", "address", "phone", "description", "descriptionHTML", "avata", "userId"],
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
        toCreate.map(item => tocreate2.push({ garaId: data.garaId, date: item.date, timeType: item.timeType }))

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


        console.log(gara)
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
let deletePickCarService = async (data) => {
    try {
        console.log(data)
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
module.exports = {
    readInfoGaraService, getCarWithCarCompany, getAllCar, getCarWithCarId, registerCartoGaraService, readAllTimeService, createBulkScheduleService,
    getAllCarByGaraService, deletePickCarService
}