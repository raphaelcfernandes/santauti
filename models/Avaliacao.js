/**
 * Created by raphael on 1/19/17.
 */
'use strict';
module.exports = function(sequelize, DataTypes) {
    var Avaliacao = sequelize.define('Avaliacao', {
        Registro: {type: DataTypes.INTEGER,
            allowNull: false
        },
        CPFPaciente: {type: DataTypes.STRING,
            allowNull: false
        },
        NroAtendimento: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Data: {
            type: DataTypes.DATE,
            allowNull: false
        },
        HoraCriada: {
            type: DataTypes.TIME,
            allowNull: false
        },
        DataModificada: {
            type: DataTypes.DATETIME,
            allowNull: false
        }
    }, {
        classMethods: {
            associate: function(models) {
                Avaliacao.hasOne(Profissional,{
                    as:'Registro',
                    foreignKey: 'Registro'
                });
                Avaliacao.hasOne(Paciente,{
                    as:'CPFPaciente',
                    foreignKey: 'CPF'
                });
                Avaliacao.hasOne(Fichas,{
                    as:'NroAtendimento',
                    foreignKey: 'NroAtendimento'
                });
            }
        },
        tableName: 'Avaliacao'
    });
    return Avaliacao;
};