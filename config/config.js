// env 사용 설정
require("dotenv").config();

const development = {
    username: "sesac",
    password: "1234",
    database: "CMM",
    host: "127.0.0.1",
    dialect: "mysql",
    timezone: "+09:00",
};

const prod = {
    username: "sesac",
    password: "1234",
    database: "CMM",
    host: "115.85.183.171",
    dialect: "mysql",
    timezone: "+09:00",
};

module.exports = { development, prod };
