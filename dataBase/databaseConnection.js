'use strict';
var Sequelize = require('sequelize');
var sequelize = new Sequelize('santauti', 'raphael', '123', {
    host: 'localhost',
    dialect: 'mysql',
    port:3306,
    dialectOptions: {
        ssl: true
    },
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
});
