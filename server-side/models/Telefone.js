/**
 * Created by raphael on 1/19/17.
 */
'use strict';
module.exports = function(sequelize, DataTypes) {
    var Telefone = sequelize.define('Telefone', {
        ID: { //PK AND FK to Pessoa
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            primaryKey: true,
            reference:{
                model: 'Pessoa',
                key: 'ID'
            }
        },
        Telefone: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        TipoTelefone: DataTypes.STRING
    }, {
        classMethods: {},
        tableName: 'Telefone',
        timestamps:false
    });
    return Telefone;
};