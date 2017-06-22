'use strict';
var Sequelize = require('sequelize');
var sequelize = new Sequelize('santauti', 'raphael', '123', {
    host: 'localhost',
    dialect: 'mysql',
    port:3306,
    dialectOptions: {
        ssl: true
    },
    define:{
        timestamps:false,
        createdAt:false
    },
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});

var kex = require('knex')({
   client: 'mysql',
    connection: {
        host: 'localhost',
        user : 'raphael',
        password : '123',
        database : 'santauti',
        port:3306
    }
});