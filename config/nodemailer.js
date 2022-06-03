const nodemailer = require('nodemailer');
const USER_NODEMAILER = process.env.USER_NODEMAILER
const PASS_NODEMAILER = process.env.PASS_NODEMAILER




let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: USER_NODEMAILER, PASS_NODEMAILER
    
});
module.exports = transporter;
