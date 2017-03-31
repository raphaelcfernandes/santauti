/**
 * Created by raphael on 3/14/17.
 */
'use strict';
module.exports = function(sequelize, DataTypes) {
    var Pendencias = sequelize.define('Pendencias', {
        IDPendencias:{
            type: DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true,
            allowNull:false
        },
        NroAtendimento: { //FK to Evolucao
            type: DataTypes.INTEGER,
            allowNull: false,
            reference:{
                model: 'Fichas',
                key: 'NroAtendimento'
            }
        },
        IDPaciente:{ //FK to Paciente
            type: DataTypes.INTEGER,
            allowNull: false,
            reference:{
                model: 'Paciente',
                key: 'ID'
            }
        },
        Comentarios:{
            type: DataTypes.TEXT,
            allowNull:true
        },
        Descricao:{
            type: DataTypes.TEXT,
            allowNull:true
        },
        DataDiagnosticado:{
            type: DataTypes.DATE,
            allowNull: true
        },
        DataResolvido:{
            type: DataTypes.DATE,
            allowNull: true
        }
    }, {
        classMethods: {
            associate: function (models) {
                Pendencias.belongsTo(models.Fichas, {
                    foreignKey: 'NroAtendimento'
                });
                Pendencias.belongsTo(models.Paciente,{
                    foreignKey: 'IDPaciente'
                });
            }
        },
        tableName: 'Pendencias',
        timestamps:false
    });
    return Pendencias;
};