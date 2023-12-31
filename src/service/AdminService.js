import db from "../models";
import bcrypt from 'bcryptjs';
const { Op, where } = require("sequelize");
const getUserWithPage = async (page, limit) => {
    try {
        let offset = (page - 1) * limit
        let { count, rows } = await db.User.findAndCountAll({
            attributes: ["id", "userName", "email", "phone", "gender", "address"],
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
            include: { model: db.Group, attributes: ['id', "name", "description"] },

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
                status: 'S1'

            },
            attributes: ["id", "nameGara", "address", "phone", "description", "descriptionHTML"],
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
            user.save()

        }
        let user1 = await db.User.findOne({
            where: { id: data.id }
        })
        if (user1) {
            user1.groupId = 2
            user1.save()
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
            user.save()
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
let deleteUserService = async (inputId) => {
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
                status: 'S1',
                isDelete: null

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
module.exports = {
    getUserWithPage, getAllUser, getGaraWithPage, getAllGara, accepGaraService, test, createCarService,
    updateCarService, deleteUserService, readHandBookService
}