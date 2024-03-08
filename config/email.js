const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

const { EMAIL_SERVICE, USER_EMAIL, USER_PASSWORD } = process.env;

exports.smtpTransport = nodemailer.createTransport({
    pool: true,
    maxConnections: 1,  
    service: EMAIL_SERVICE,
    host: "smtp.naver.com",
    secure: false,
    port: 465,
    requireTLS: true,
    auth: {
        user: USER_EMAIL,
        pass: USER_PASSWORD,
    },
  tls: {
    rejectUnauthorized: false
  }
});