/**
 * Created by raphael on 3/14/17.
 */
'use strict';

module.exports = function(sequelize, DataTypes) {
    var Dispositivos = sequelize.define('Dispositivos', {
        IDPaciente: { //FK to Evolucao
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            reference:{
                model: "Paciente",
                key: 'ID'
            }
        },
        IDDispositivos:{
            type: DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true,
            allowNull:false
        },
        DispositivoDescricao:{
            type: DataTypes.TEXT,
            allowNull:true
        },
        DataInicio:{
            type: DataTypes.DATE,
            allowNull: true
        },
        DataFim:{
            type: DataTypes.DATE,
            allowNull: true
        }
    }, {
        classMethods: {
        },
        tableName: 'Dispositivos'
    });
    return Dispositivos;
};