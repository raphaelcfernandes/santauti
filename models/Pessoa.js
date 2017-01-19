'use strict';
module.exports = function(sequelize, DataTypes) {
    var Pessoa = sequelize.define('Pessoa', {
        CPF: {type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            primaryKey: true
        },
        Nome: {type: DataTypes.STRING,
            allowNull: false
        },
        Sobrenome: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Identidade: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        DataNascimento: {
            type: DataTypes.DATE,
            allowNull:false
        },
        Rua: DataTypes.STRING,
        Numero: DataTypes.INTEGER,
        Bairro: DataTypes.STRING,
        Apartamento: DataTypes.STRING,
        Cep: DataTypes.INTEGER,
        Cidade: DataTypes.STRING
    }, {
        classMethods: {
            associate: function(models) {
                // associations can be defined here
            }
        },
        tableName: 'Pessoa'
    });
    return Pessoa;
};