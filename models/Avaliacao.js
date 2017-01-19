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
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        HoraCriada: {
            type: DataTypes.TIME,
            allowNull: false
        },
        DataModificada: {
            type: DataTypes.DATE,
            allowNull: false
        }
    }, {
        classMethods: {
            associate: function(models) {
                Avaliacao.hasOne(models.Profissional,{
                    as:'RegistroProfissional',
                    foreignKey: 'Registro'
                });
                Avaliacao.hasOne(models.Paciente,{
                    as:'CpfPaciente',
                    foreignKey: 'CPF'
                });
                Avaliacao.hasOne(models.Fichas,{
                    as:'NroAtendimentoFicha',
                    foreignKey: 'NroAtendimento'
                });
            }
        },
        tableName: 'Avaliacao'
    });
    return Avaliacao;
};