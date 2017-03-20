/**
 * Created by raphael on 1/19/17.
 */
'use strict';
var bcrypt = require('bcrypt-nodejs');
module.exports = function(sequelize, DataTypes) {
    var Profissional = sequelize.define('Profissional', {
        Registro: { //PK
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            unique: true
        },
        ID:{ //FK to Pessoa
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            references:{
                model: 'Pessoa',
                key: 'ID'
            }
        },
        Usuario: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        Senha: {
            type: DataTypes.STRING,
            allowNull: false
        },
        TipoProfissional: DataTypes.INTEGER,
        Ativo: DataTypes.BOOLEAN
    }, {
        classMethods: {
            associate: function(models) {
                Profissional.belongsTo(models.Pessoa,{
                    foreignKey: 'ID'
                });
            }
        },
        tableName: 'Profissional',
        timestamps: false
    });
    return Profissional;
};