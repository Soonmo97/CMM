'use strict';

const Sequelize = require('sequelize');
const config = require(__dirname + '/../config/config.json')['development'];
const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
