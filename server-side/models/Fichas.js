/**
 * Created by raphael on 1/19/17.
 */
'use strict';
module.exports = function(sequelize, DataTypes) {
    var Fichas = sequelize.define('Fichas', {
        NroAtendimento: {//PK
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            primaryKey: true,
            autoIncrement: true
        },
        Registro: { //FK to Profissional
            type: DataTypes.INTEGER,
            allowNull: false,
            reference:{
                model: 'Profissional',
                key: 'Registro'
            }
        },
        IDPaciente: { //FK to Paciente
            type: DataTypes.INTEGER,
            allowNull: false,
            reference:{
                model: 'Paciente',
                key: 'ID'
            }
        },
        DataCriado: {
            type: DataTypes.DATE,
            allowNull: false
        },
        DataModificado: {
            type: DataTypes.DATE,
            allowNull: false
        }
    }, {
        tableName: 'Fichas',
        timestamps:false
    });
    return Fichas;
};