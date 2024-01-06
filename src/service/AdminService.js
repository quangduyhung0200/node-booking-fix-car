import db from "../models";
import bcrypt from 'bcryptjs';
import price from "../models/price";
import sequelize from "sequelize";
const { Op, where } = require("sequelize");
const getUserWithPage = async (page, limit) => {
    try {
        let offset = (page - 1) * limit
        let { count, rows } = await db.User.findAndCountAll({
            where: {
                isDelete: {
                    [Op.ne]: 1
                },
            },
            attributes: ["id", "userName", "email", "phone", "gender", "address", 'avata', 'groupId'],
            include: { model: db.Group, attributes: ["id", "name", "description"], as: 'groupData' },
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
const getAllUser = async () => {
    let data = {}
    try {

        let user = await db.User.findAll({
            attributes: ["id", "username", "email", "phone", "gender"],
            include: { model: db.Group, as: 'groupData', attributes: ['id', "name", "description"] },

            raw: false,
            nest: true
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
let getGaraWithPage = async (page, limit) => {
    try {
        let offset = (page - 1) * limit
        let { count, rows } = await db.Gara.findAndCountAll({
            where: {
                status: 'S1',
                isDelete: 0

            },
            attributes: ["id", "nameGara", "address", "phone", "description", "contenHTML"],
            include: [{ model: db.Provind, attributes: ['id', "name"], as: 'provindGaraData' },
            { model: db.User, attributes: ['id'], as: 'userGara' }],

            order: [['id', 'DESC']],
            raw: true,
            nest: true,

            offset: offset,
            limit: limit
        })
        let totalPage = Math.ceil(count / limit)
        let data = {}


        data = {
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
const getAllGara = async () => {

    try {

        let user = await db.Gara.findAll({
            attributes: ["id", "nameGara", "address", "avata", "phone", "description"],
            include: { model: db.Provind, attributes: ["id", "name"], as: 'provindGaraData' },
            order: [['id', 'DESC']],
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


let accepGaraService = async (data) => {
    try {
        let user = await db.Gara.findOne({ where: { userId: data.id, status: 'S1' } }
        )

        if (user) {

            user.status = 'S2'
            await user.save()

        }
        let user1 = await db.User.findOne({
            where: { id: data.id }
        })
        if (user1) {
            user1.groupId = 2
            await user1.save()
            return {
                EM: 'update user seccess',
                EC: 0,
                DT: ''
            }
        }


        else {
            return {
                EM: 'create user fail',
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

let test = async () => {

    try {

        let user = await db.CarCompany.findAll({



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


let createCarService = async (data) => {
    try {

        let user = await db.Car.findOne({
            where: {
                nameCar: data.nameCar
            }
        }



        );

        if (user) {

            return {
                EM: 'car has been declare in database',
                EC: 1,
                DT: ''
            }
        }
        else {
            await db.Car.create({
                nameCar: data.nameCar,
                carCompanyId: data.selectedCarCompany,
                avata: data.avata,
                descriptions: data.descriptions,


            });
            return {
                EM: 'create success',
                EC: 0,
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
let updateCarService = async (data) => {
    try {


        let user = await db.Car.findOne({ where: { id: data.id } }
        )
        if (user) {
            user.nameCar = data.nameCar;
            user.carCompanyId = data.carCompanyId;
            user.avata = data.avata;
            user.descriptions = data.descriptions
            await user.save()
            return {
                EM: 'update car seccess',
                EC: 0,
                DT: ''
            }
        }


        else {
            return {
                EM: 'updatae user fail',
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
let deletecarService = async (inputId) => {
    try {

        let user = await db.Car.findOne({
            where: { id: inputId }
        })

        if (user) {
            user.destroy()
            return {
                EM: 'delete success',
                EC: 0,
                DT: []
            }
        }
        else {
            return {
                EM: 'user not exit',
                EC: 1,
                DT: []
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
let readHandBookService = async (page, limit, staffId) => {
    try {
        let offset = (page - 1) * limit
        let { count, rows } = await db.HandBook.findAndCountAll({
            where: {
                staffId: staffId,

                isDelete: {
                    [Op.ne]: 1
                },

            },
            attributes: ["id", "staffId", "contentHTML", "contentMarkdown", "avata", "status", "title", "createdAt"],
            include: [{ model: db.User, as: 'StaffHandbookData' }],



            order: [['id', 'DESC']],
            raw: true,
            nest: true,

            offset: offset,
            limit: limit
        })
        let totalPage = Math.ceil(count / limit)
        let data = {}


        data = {
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

let createHandBookService = async (data) => {
    try {
        let admin = await db.User.findOne({
            where: { id: data.staffId }
        })
        if (admin.groupId === 4) {
            let handBook = await db.HandBook.findOne({ where: { title: data.title } })
            if (handBook === null) {
                await db.HandBook.create({
                    staffId: data.staffId,
                    contentHTML: data.contentHTML,
                    contentMarkdown: data.contentMarkdown,
                    avata: data.avata,
                    isDelete: false,
                    status: 'S2',
                    title: data.title,
                    garaId: data.garaId

                })
                return {
                    EM: 'create Succes by admin',
                    EC: 0,
                    DT: ''
                }

            } else {
                return {
                    EM: 'hanndbook alrydi has',
                    EC: 1,
                    DT: ''
                }
            }
        }
        else {
            let handBook = await db.HandBook.findOne({ where: { title: data.title } })
            if (handBook === null) {
                await db.HandBook.create({
                    staffId: data.staffId,
                    contentHTML: data.contentHTML,
                    contentMarkdown: data.contentMarkdown,
                    avata: data.avata,
                    isDelete: false,
                    status: 'S1',
                    title: data.title,
                    garaId: data.garaId

                })
                return {
                    EM: 'create Succes',
                    EC: 0,
                    DT: ''
                }

            } else {
                return {
                    EM: 'hanndbook alrydi has',
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
            DT: ''
        }
    }

}
let getAllHandBook = async (page, limit) => {
    try {

        let offset = (page - 1) * limit
        let { count, rows } = await db.HandBook.findAndCountAll({
            where: {

                status: 'S1',
                isDelete: {
                    [Op.ne]: 1
                },

            },
            attributes: ["id", "staffId", "contentHTML", "contentMarkdown", "avata", "status", "title", "createdAt"],
            include: [{ model: db.User, as: 'StaffHandbookData' }],



            order: [['id', 'DESC']],
            raw: true,
            nest: true,

            offset: offset,
            limit: limit
        })
        let totalPage = Math.ceil(count / limit)
        let data = {}


        data = {
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
let readHandBookById = async (id) => {
    try {


        let data = await db.HandBook.findOne({
            where: {

                id: id,
                isDelete: {
                    [Op.ne]: 1
                },

            },
            attributes: ["id", "staffId", "contentHTML", "contentMarkdown", "avata", "status", "title", "createdAt", "garaId"],
            include: [{ model: db.User, as: 'StaffHandbookData' },
            {
                model: db.Gara, as: 'GaraHandBook'
            }],



            order: [['id', 'DESC']],
            raw: true,
            nest: true,


        })





        if (data) {

            return {
                EM: 'GET DATA SUCCESS',
                EC: 0,
                DT: data
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
            EM: 'SOMTHING WRONG',
            EC: -1,
            DT: []
        }
    }
}
let accepHandBookService = async (data) => {
    try {


        let handBook = await db.HandBook.findOne({ where: { id: data.id } })
        if (handBook === null) {
            return {
                EM: 'dont fout data',
                EC: 1,
                DT: ''
            }


        } else {
            handBook.status = 'S2'
            await handBook.save()
            return {
                EM: 'update Succes',
                EC: 0,
                DT: handBook
            }
        }





    } catch (e) {
        console.log(e)
        return {
            EM: 'SOMTHING WRONG',
            EC: -1,
            DT: ''
        }
    }

}
let getAllGroupService = async () => {
    try {


        let data = await db.Group.findAll({

            raw: true,

        })
        if (data) {

            return {
                EM: 'GET DATA SUCCESS',
                EC: 0,
                DT: data
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
            EM: 'SOMTHING WRONG',
            EC: -1,
            DT: []
        }
    }
}
let userUpdateService = async (data) => {
    try {


        let user = await db.User.findOne({ where: { id: data.userId } }
        )
        if (user) {
            user.userName = data.userName;
            user.phone = data.phone;
            user.gender = data.gender;
            user.address = data.address
            user.groupId = data.groupId
            user.avata = data.avata
            await user.save()
            console.log(user)
            return {
                EM: 'update user seccess',
                EC: 0,
                DT: ''
            }

        }


        else {
            return {
                EM: 'updatae user fail',
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
let readAllHandbookService = async (page, limit) => {
    try {

        let offset = (page - 1) * limit
        let { count, rows } = await db.HandBook.findAndCountAll({
            where: {

                status: 'S2',
                isDelete: {
                    [Op.ne]: 1
                },

            },
            attributes: ["id", "staffId", "contentHTML", "contentMarkdown", "avata", "status", "title", "createdAt"],
            include: [{ model: db.User, as: 'StaffHandbookData' }],



            order: [['id', 'DESC']],
            raw: true,
            nest: true,

            offset: offset,
            limit: limit
        })
        let totalPage = Math.ceil(count / limit)
        let data = {}


        data = {
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

let deleteUserService = async (data) => {
    try {


        let user = await db.User.findOne({ where: { id: data.id } }
        )
        if (user) {
            user.isDelete = 1;

            await user.save()
            return {
                EM: 'delete user seccess',
                EC: 0,
                DT: ''
            }
        } else {
            return {
                EM: 'delete user fail',
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
let updateHandbookService = async (data) => {
    try {


        let user = await db.User.findOne({ where: { id: data.staffId } }
        )
        if (user.groupId === 4) {
            let handBook = await db.HandBook.findOne({ where: { id: data.id } })
            if (handBook) {
                handBook.staffId = data.staffId;
                handBook.contentHTML = data.contentHTML;
                handBook.contentMarkdown = data.contentMarkdown;

                handBook.avata = data.avata;
                handBook.status = 'S2';
                handBook.title = data.title;

                handBook.garaId = data.garaId;


                await handBook.save()
                return {
                    EM: 'UPDATE user seccess BY ADMIN',
                    EC: 0,
                    DT: ''
                }
            } else {
                return {
                    EM: 'UPDATE user fail BY ADMIN',
                    EC: 1,
                    DT: ''
                }
            }

        } else {
            let handBook = await db.HandBook.findOne({ where: { id: data.id } })
            if (handBook) {
                handBook.staffId = data.staffId;
                handBook.contentHTML = data.contentHTML;
                handBook.contentMarkdown = data.contentMarkdown;

                handBook.avata = data.avata;
                handBook.status = 'S1';
                handBook.title = data.title;

                handBook.garaId = data.garaId;


                await handBook.save()
                return {
                    EM: 'UPDATE user seccess BY staff',
                    EC: 0,
                    DT: ''
                }
            } else {
                return {
                    EM: 'UPDATE user fail BY staff',
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
let deleteHandbookService = async (data) => {
    try {


        let user = await db.HandBook.findOne({ where: { id: data.id } }
        )
        if (user) {
            user.isDelete = 1;

            await user.save()
            return {
                EM: 'delete user seccess',
                EC: 0,
                DT: ''
            }
        } else {
            return {
                EM: 'delete user fail',
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
let getAllGarabyPageService = async (page, limit) => {
    try {

        let offset = (page - 1) * limit
        let { count, rows } = await db.Gara.findAndCountAll({
            where: {

                status: 'S2',
                isDelete: {
                    [Op.ne]: 1
                },

            },
            attributes: ["id", "nameGara", "address", "phone", "description", "contenHTML", "status"],
            include: { model: db.Provind, attributes: ['id', "name"], as: 'provindGaraData' },


            order: [['id', 'DESC']],
            raw: true,
            nest: true,

            offset: offset,
            limit: limit
        })
        let totalPage = Math.ceil(count / limit)
        let data = {}


        data = {
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
let deleteGaraService = async (data) => {
    try {


        let user = await db.Gara.findOne({ where: { id: data.id } }
        )
        if (user) {
            user.isDelete = 1;

            await user.save()
            return {
                EM: 'delete gara seccess',
                EC: 0,
                DT: ''
            }
        } else {
            return {
                EM: 'delete gara fail',
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
let getAllBookingbypageService = async (page, limit) => {
    try {

        let offset = (page - 1) * limit
        let { count, rows } = await db.Booking.findAndCountAll({
            where: {


                isDelete: {
                    [Op.ne]: 1
                },

            },
            attributes: ["id", "userId", "garaid", "carId", "timeType", "serviceId", "date", "status", "createdAt", "priceId"],
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
                    model: db.Price, as: 'PriceBookingData', attributes: ["id", "value"]
                },






            ], raw: true,
            nest: true,

            offset: offset,
            limit: limit
        })
        let totalPage = Math.ceil(count / limit)
        let data = {}


        data = {
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
let getAllStatus = async () => {

    try {

        let status = await db.StatusBooking.findAll({

        })
        if (status) {
            return {
                EM: 'get data successs',
                EC: 0,
                DT: status
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
let updateStatusService = async (data) => {
    try {


        let user = await db.Booking.findOne({ where: { id: data.id } }
        )
        if (user) {
            user.status = data.status;

            await user.save()
            return {
                EM: 'update booking seccess',
                EC: 0,
                DT: ''
            }
        } else {
            return {
                EM: 'update booking fail',
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
let searchBookingService = async (user, gara, car, service, date, price, status) => {

    try {


        let data = await db.Booking.findAll({
            where: {
                isDelete: {
                    [Op.ne]: 1
                },

            },

            attributes: ["id", "userId", "garaid", "carId", "timeType", "serviceId", "date", "status", "createdAt", "priceId"],
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
                    model: db.Price, as: 'PriceBookingData', attributes: ["id", "value"]
                },






            ],
            raw: true,
            nest: true,

        })

        let results = data.filter(item => item.userId === +user || +user === 0)

        let results2 = results.filter(item => item.garaid === +gara || +gara === 0)
        let results3 = results2.filter(item => item.carId === +car || +car === 0)
        let results4 = results3.filter(item => item.serviceId === +service || +service === 0)
        let results5 = results4.filter(item => item.priceId === +price || +price === 0)
        let results6 = results5.filter(item => item.status === status || +status === 0)
        let results7 = results6.filter(item => item.date === date || +date === 0)

        return {
            EM: 'GET DATA SUCCESS',
            EC: 0,
            DT: results7
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
let searchUserService = async (user, group) => {

    try {
        let data = await db.User.findAll({
            where: {
                isDelete: {
                    [Op.ne]: 1
                },
                name: sequelize.where(
                    sequelize.fn("LOWER", sequelize.col("userName")),
                    "LIKE",
                    "%" + user + "%"
                )

            },
            attributes: ["id", "userName", "email", "phone", "gender", "groupId"],
            include: { model: db.Group, as: 'groupData', attributes: ['id', "name", "description"] },

            raw: true,
            nest: true
        });



        let results = data.filter(item => item.groupId === +group || +group === 0)


        return {
            EM: 'GET DATA SUCCESS',
            EC: 0,
            DT: results
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
let searchGaranocenserService = async (gara, provind) => {

    try {
        let data = await db.Gara.findAll({
            where: {
                status: 'S1',
                isDelete: {
                    [Op.ne]: 1
                },
                name: sequelize.where(
                    sequelize.fn("LOWER", sequelize.col("nameGara")),
                    "LIKE",
                    "%" + gara + "%"
                )

            },
            attributes: ["id", "nameGara", "address", "phone", "description", "contenHTML", 'provindId'],
            include: { model: db.Provind, attributes: ['id', "name"], as: 'provindGaraData' },



            raw: true,
            nest: true
        });



        let results = data.filter(item => item.provindId === +provind || +provind === 0)


        return {
            EM: 'GET DATA SUCCESS',
            EC: 0,
            DT: results
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
let searchGaraService = async (gara, provind) => {

    try {
        let data = await db.Gara.findAll({
            where: {
                status: 'S2',
                isDelete: {
                    [Op.ne]: 1
                },
                name: sequelize.where(
                    sequelize.fn("LOWER", sequelize.col("nameGara")),
                    "LIKE",
                    "%" + gara + "%"
                )

            },
            attributes: ["id", "nameGara", "address", "phone", "description", "contenHTML", 'provindId'],
            include: { model: db.Provind, attributes: ['id', "name"], as: 'provindGaraData' },



            raw: true,
            nest: true
        });



        let results = data.filter(item => item.provindId === +provind || +provind === 0)


        return {
            EM: 'GET DATA SUCCESS',
            EC: 0,
            DT: results
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
let searchCarService = async (car, carcompany) => {

    try {
        let data = await db.Car.findAll({
            where: {

                isDelete: {
                    [Op.ne]: 1
                },
                name: sequelize.where(
                    sequelize.fn("LOWER", sequelize.col("nameCar")),
                    "LIKE",
                    "%" + car + "%"
                )

            },
            attributes: ["id", "nameCar", "carCompanyId", "avata", "descriptions"],
            include: [{
                model: db.CarCompany, attributes: ["id", "name"], as: 'carCompanyData',
            }],



            raw: true,
            nest: true
        });



        let results = data.filter(item => item.carCompanyId === +carcompany || +carcompany === 0)


        return {
            EM: 'GET DATA SUCCESS',
            EC: 0,
            DT: results
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
let readAllStaffService = async () => {

    try {
        let data = await db.User.findAll({
            where: {

                isDelete: {
                    [Op.ne]: 1
                },
                groupId: [3, 4]

            },
            attributes: ["id", "userName", "email", "phone", "gender", "groupId"],
            include: { model: db.Group, as: 'groupData', attributes: ['id', "name", "description"] },



            raw: true,
            nest: true
        });






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
let searchHandbookUncensorService = async (title, staff) => {

    try {
        let data = await db.HandBook.findAll({
            where: {
                status: 'S1',
                isDelete: {
                    [Op.ne]: 1
                },
                name: sequelize.where(
                    sequelize.fn("LOWER", sequelize.col("title")),
                    "LIKE",
                    "%" + title + "%"
                )

            },
            include: [{
                model: db.User, as: 'StaffHandbookData', attributes: {
                    exclude: ['avata', 'password']
                }
            }],



            raw: true,
            nest: true
        });



        let results = data.filter(item => item.staffId === +staff || +staff === 0)


        return {
            EM: 'GET DATA SUCCESS',
            EC: 0,
            DT: results
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
let searchHandbookService = async (title, staff) => {

    try {
        let data = await db.HandBook.findAll({
            where: {
                status: 'S2',
                isDelete: {
                    [Op.ne]: 1
                },
                name: sequelize.where(
                    sequelize.fn("LOWER", sequelize.col("title")),
                    "LIKE",
                    "%" + title + "%"
                )

            },
            include: [{
                model: db.User, as: 'StaffHandbookData', attributes: {
                    exclude: ['avata', 'password']
                }
            }],



            raw: true,
            nest: true
        });



        let results = data.filter(item => item.staffId === +staff || +staff === 0)


        return {
            EM: 'GET DATA SUCCESS',
            EC: 0,
            DT: results
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
let getCarCompanyByPageService = async (page, limit) => {
    try {

        let offset = (page - 1) * limit
        let { count, rows } = await db.CarCompany.findAndCountAll({
            where: {


                isDelete: {
                    [Op.ne]: 1
                },

            },
            attributes: ["id", "name", "description", "avata"],
            raw: true,
            nest: true,

            offset: offset,
            limit: limit
        })
        let totalPage = Math.ceil(count / limit)
        let data = {}


        data = {
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
let createCarCompanyService = async (datainput) => {
    try {


        await db.CarCompany.create({
            name: datainput.name,
            description: datainput.description,
            avata: datainput.avata,
            isDelete: 0


        })



        return {
            EM: 'create DATA SUCCESS',
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
let updateCarCompanyService = async (datainput) => {
    try {


        let data = await db.CarCompany.findOne({
            where: { id: datainput.id }



        })
        if (data) {
            data.name = datainput.name
            data.description = datainput.description
            data.avata = datainput.avata
            await data.save()
            return {
                EM: 'update DATA SUCCESS',
                EC: 0,
                DT: ''
            }

        }
        else {
            return {
                EM: 'update DATA fail',
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
let deleteCarCompanyService = async (datainput) => {
    try {


        let data = await db.CarCompany.findOne({
            where: { id: datainput.id }



        })
        if (data) {
            data.isDelete = 1

            await data.save()
            return {
                EM: 'update DATA SUCCESS',
                EC: 0,
                DT: ''
            }

        }
        else {
            return {
                EM: 'update DATA fail',
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
let searchCarcompanyService = async (carcompany) => {

    try {
        let data = await db.CarCompany.findAll({
            where: {

                isDelete: {
                    [Op.ne]: 1
                },
                name: sequelize.where(
                    sequelize.fn("LOWER", sequelize.col("name")),
                    "LIKE",
                    "%" + carcompany + "%"
                )

            },




            raw: true,
            nest: true
        });






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
let getComentbypageService = async (page, limit) => {
    try {

        let offset = (page - 1) * limit
        let { count, rows } = await db.Comment.findAndCountAll({
            where: {


                isDelete: {
                    [Op.ne]: 1
                },

            },
            attributes: ["id", "comment", "garaId", "userId", "rate"],
            include: [{
                model: db.User, as: 'UserComment'
            },
            {
                model: db.Gara, as: 'GaraComment'
            }
            ],
            raw: true,
            nest: true,

            offset: offset,
            limit: limit
        })
        let totalPage = Math.ceil(count / limit)
        let data = {}


        data = {
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
let deleteCommentService = async (datainput) => {
    try {


        let data = await db.Comment.findOne({
            where: { id: datainput.id }



        })
        let { count, rows } = await db.Comment.findAndCountAll({
            where: {

                garaId: datainput.garaId,
                isDelete: {
                    [Op.ne]: 1
                },

            },
            attributes: ["id", "comment", "garaId", "userId", "rate"],
            include: [{
                model: db.User, as: 'UserComment'
            },
            {
                model: db.Gara, as: 'GaraComment'
            }
            ],
            raw: true,
            nest: true,


        })
        if (data) {
            data.isDelete = 1

            await data.save()
            let gara = await db.Gara.findOne({ where: { id: datainput.garaId } })
            if (gara) {

                gara.rateId = +((gara.rateId * count) - data.rate) / (count - 1)
                console.log('danh gia hien tai', count)
                console.log('soluong danh gia', gara.rateId)
                console.log('ddiem danh gia', gara.rateId * count)
                console.log('danh gia can xoa', data.rate)
                console.log('ket qua', gara.rateId)
                await gara.save()
                return {
                    EM: 'update DATA SUCCESS',
                    EC: 0,
                    DT: ''
                }
            }
            else {
                return {
                    EM: 'no data',
                    EC: 1,
                    DT: ''
                }
            }


        }
        else {
            return {
                EM: 'no data',
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
let searchCommentService = async (gara, user, rate) => {

    try {
        let data = await db.Comment.findAll({
            where: {

                isDelete: {
                    [Op.ne]: 1
                },


            },
            attributes: ["id", "comment", "garaId", "userId", "rate"],
            include: [{
                model: db.User, as: 'UserComment'
            },
            {
                model: db.Gara, as: 'GaraComment'
            }
            ],



            raw: true,
            nest: true
        });



        let results = data.filter(item => item.garaId === +gara || +gara === 0)

        let results2 = results.filter(item => item.userId === +user || +user === 0)
        let results3 = results2.filter(item => item.rate === rate || +rate === 0)
        return {
            EM: 'GET DATA SUCCESS',
            EC: 0,
            DT: results3
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
let deleteBookingService = async (datainput) => {
    try {


        let data = await db.Booking.findOne({
            where: { id: datainput.id }



        })
        if (data) {
            data.isDelete = 1

            await data.save()
            return {
                EM: 'delete DATA SUCCESS',
                EC: 0,
                DT: ''
            }

        }
        else {
            return {
                EM: 'delete DATA fail',
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
let searchHandbookStaffService = async (title, staff, status) => {

    try {
        let data = await db.HandBook.findAll({
            where: {
                staffId: +staff,

                isDelete: {
                    [Op.ne]: 1
                },
                name: sequelize.where(
                    sequelize.fn("LOWER", sequelize.col("title")),
                    "LIKE",
                    "%" + title + "%"
                )

            }, include: [{
                model: db.User, as: 'StaffHandbookData', attributes: {
                    exclude: ['avata', 'password']
                }
            }],




            raw: true,
            nest: true
        });





        let results2 = data.filter(item => item.status === status || +status === 0)
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
let deniceGaraService = async (datainput) => {
    try {
        let user = await db.Gara.findOne({ where: { userId: datainput.id, status: 'S1' } }
        )

        if (user) {

            user.status = 'S3'
            await user.save()
            return {
                EM: 'update user success',
                EC: 0,
                DT: ''
            }

        }
        else {
            return {
                EM: 'update user fail',
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
module.exports = {
    getUserWithPage, getAllUser, getGaraWithPage, getAllGara, accepGaraService, test, createCarService,
    updateCarService, deletecarService, readHandBookService, createHandBookService, getAllHandBook, readHandBookById,
    accepHandBookService, getAllGroupService, userUpdateService, readAllHandbookService, deleteUserService, updateHandbookService,
    deleteHandbookService, getAllGarabyPageService, deleteGaraService, getAllBookingbypageService, getAllStatus, updateStatusService,
    searchBookingService, searchUserService, searchGaranocenserService, searchGaraService, searchCarService, readAllStaffService,
    searchHandbookUncensorService, searchHandbookService, getCarCompanyByPageService, createCarCompanyService, updateCarCompanyService,
    deleteCarCompanyService, searchCarcompanyService, getComentbypageService, deleteCommentService, searchCommentService, deleteBookingService,
    searchHandbookStaffService, deniceGaraService
}