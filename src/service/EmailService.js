import { v4 as uuidv4 } from 'uuid';
require('dotenv').config();
import nodemailer from 'nodemailer'

let sendSimpleEmail = async (dataSend) => {

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            // TODO: replace `user` and `pass` values from <https://forwardemail.net>
            user: process.env.MAIL,
            pass: process.env.MAIL_PASS,
        },
    });

    const info = await transporter.sendMail({
        from: '"duy hung 👻" <hung321chiengden@gmail.com>', // sender address
        to: dataSend.reciverEmail, // list of receivers
        subject: "Thông tin đặt lịch sửa xe ✔", // Subject line
        text: "", // plain text body
        html: `<h3>Xin chào ${dataSend.customerName} !</h3>
            <p>Bạn nhận được email này vì đã đặt lịch sửa xe</p>
            <p>Thông tin đặt lệnh sửa xe</p>
            <div><b>Thời gian: ${dataSend.time}</b></div>
            <div><b>gara: ${dataSend.garaName}</b></div>
            <p>Nếu các thông tin trên đã chính xác, vui lòng click link bên dưới để hoàn tất thủ tục đặt lịch khám bệnh</p>
            <div>
            <a href=${dataSend.rediretLink} target="_blank"	>Click here</a>
            </div>
            <div>Xin chân thành cảm ơn</div>`, // html body
    });



}
let sendcomfemEmail = async (dataSend) => {

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            // TODO: replace `user` and `pass` values from <https://forwardemail.net>
            user: process.env.MAIL,
            pass: process.env.MAIL_PASS,
        },
    });

    const info = await transporter.sendMail({
        from: '"duy hung 👻" <hung321chiengden@gmail.com>', // sender address
        to: dataSend.reciverEmail, // list of receivers
        subject: "Bcs sĩ xác nhận lịch khám ✔", // Subject line
        text: "", // plain text body
        html: `
            <p>Bạn nhận được email này vì bác sĩ đã xác nhận lịch khám</p>
            <p>Thông tin đặt lệnh khám bệnh</p>
            <div><b>Thời gian: ${dataSend.time}</b></div>
  
       
       
            <div>Xin chân thành cảm ơn</div>`, // html body
    });



}


module.exports = {
    sendSimpleEmail, sendcomfemEmail
}