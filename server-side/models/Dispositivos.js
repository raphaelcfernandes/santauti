/**
 * Created by raphael on 3/14/17.
 */
'use strict';

module.exports = function(sequelize, DataTypes) {
    var Dispositivos = sequelize.define('Dispositivos', {
        IDDispositivos:{
            type: DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true,
            allowNull:false
        },
        IDPaciente: { //FK to Evolucao
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            reference:{
                model: "Paciente",
                key: 'ID'
            }
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
            associate: function (models) {
                Dispositivos.belongsTo(models.Paciente, {
                    foreignKey: 'IDPaciente'
                });
            }
        },
        tableName: 'Dispositivos',
        timestamps:false
    });
    return Dispositivos;
};