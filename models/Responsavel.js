/**
 * Created by raphael on 1/19/17.
 */
'use strict';
module.exports = function(sequelize, DataTypes) {
    var Responsavel = sequelize.define('Responsavel', {
        Registro: {type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        CpfPaciente: {type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        }
    }, {
        classMethods: {
            associate: function(models) {
                Responsavel.hasOne(Profissional,{
                    as:'Registro',
                    foreignKey: 'Registro'
                });
                Responsavel.hasOne(Paciente,{
                    as:'CpfPaciente',
                    foreignKey: 'CPF'
                });
            }
        },
        tableName: 'Responsavel'
    });
    return Responsavel;
};