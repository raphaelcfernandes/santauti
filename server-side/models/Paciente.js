/**
 * Created by raphael on 1/19/17.
 */
'use strict';
module.exports = function(sequelize, DataTypes) {
    var Paciente = sequelize.define('Paciente', {
        CPF: {type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            primaryKey: true
        },
        Leito: {type: DataTypes.INTEGER,
            allowNull: false
        },
        Box: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Profissao: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Convenio: DataTypes.STRING,
    }, {
        classMethods: {
            associate: function(models) {
                Paciente.hasOne(models.Pessoa,{
                    as:'CpfPessoa',
                    foreignKey: 'CPF'
                });
            }
        },
        tableName: 'Paciente'
    });
    return Paciente;
};