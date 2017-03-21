'use strict';
module.exports = function(sequelize, DataTypes) {
    var Pessoa =
        sequelize.define('Pessoa', {
            ID: { //PK
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            CPF: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            Nome: {
                type: DataTypes.STRING,
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
                type: DataTypes.DATEONLY,
                allowNull:false
            },
            Rua: DataTypes.STRING,
            Numero: DataTypes.INTEGER,
            Bairro: DataTypes.STRING,
            Apartamento: DataTypes.INTEGER,
            Cep: DataTypes.STRING,
            Cidade: DataTypes.STRING,
            Email: DataTypes.STRING
        }, {
            timestamps:false,
            tableName: 'Pessoa'
        });
    return Pessoa;
};
