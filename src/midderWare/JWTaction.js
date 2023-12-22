import jwt from 'jsonwebtoken';
require('dotenv').config();



const createJWT = (payload) => {

    let key = process.env.JWT_SECRET
    let token = null
    try {
        token = jwt.sign(payload, key, { expiresIn: process.env.JWTexpiresIn });

    } catch (e) {
        console.log(e)
    }


    return token
}
const veryflyToken = (token) => {
    let key = process.env.JWT_SECRET
    let decoded = null
    try {
        decoded = jwt.verify(token, key)

    } catch (e) {
        console.log(e)
    }
    return decoded

}

const checkUserJWT = (req, res, next) => {
    // if (nonSecurePaths.includes(req.path))
    //     return next();

    let cookies = req.cookies



    if (cookies && cookies.jwt) {

        let token = cookies.jwt
        let decoded = veryflyToken(token)
        if (decoded) {

            req.user = decoded;
            req.token = token;

            next()
        }
        else {
            return res.status(401).json({
                EC: -1,
                DT: '',
                EM: 'NOT AUTHERTICATION A USER aaa'
            })
        }

    }


    else {
        return res.status(401).json({
            EC: -1,
            DT: '',
            EM: 'NOT AUTHERTICATION A USER bbbb'
        })
    }

}
const checkUserPermisstion = (req, res, next) => {
    // if (nonSecurePaths.includes(req.path))
    //     return next();

    if (req.user) {

        let email = req.user.email;
        let role = req.user.role[0].Roles;
        let currenUrl = req.path

        if (!role && role.length === 0) {

            return res.status(403).json({
                EC: -1,
                DT: '',
                EM: 'you dont have permistions to access this resource'
            })
        }


        let canAccess = role.some(item => item.name === currenUrl || currenUrl.includes(item.name));

        if (canAccess === true) {

            next()

        } else {
            return res.status(403).json({
                EC: -1,
                DT: '',
                EM: 'you dont have permistions to access this resource'
            })
        }
    }
    else {
        return res.status(403).json({
            EC: -1,
            DT: '',
            EM: 'you dont have permistions to access this resource'
        })
    }
}

module.exports = {
    createJWT, veryflyToken, checkUserJWT, checkUserPermisstion,
}