/**
 * Created by raphael on 1/19/17.
 */
'use strict';
module.exports = function(sequelize, DataTypes) {
    var Paciente = sequelize.define('Paciente', {
        ID: { //FK to Pessoa
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            primaryKey: true,
            reference:{
                model: 'Pessoa',
                key: 'ID'
            }
        },
        Leito: {
            type: DataTypes.INTEGER,
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
        Internado: DataTypes.BOOLEAN,
        Responsavel: {
            type: DataTypes.INTEGER,
            allowNull: false,
            reference:{
                //FK to Profissional
                model: 'Profissional',
                key: 'Registro'
            }
        }
    }, {
        classMethods: {
            associate: function (models) {
                Paciente.belongsTo(models.Profissional, {
                    foreignKey: 'Responsavel'
                });
                Paciente.belongsTo(models.Pessoa,{
                    foreignKey: 'ID'
                });
                Paciente.hasMany(models.Internacao,{foreignKey:'ID'});
                Paciente.hasMany(models.Dispositivos,{foreignKey:'IDPaciente'});
            }
        },
        tableName: 'Paciente',
        timestamps:false
    });
    return Paciente;
};