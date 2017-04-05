/**
 * Created by raphael on 3/14/17.
 */
'use strict';
module.exports = function(sequelize, DataTypes) {
    var ListaProblemas = sequelize.define('ListaProblemas', {
        IDListaProblemas:{
            type: DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true,
            allowNull:false
        },
        NroAtendimento: { //FK to Fichas
            type: DataTypes.INTEGER,
            allowNull: false,
            reference:{
                model: 'Fichas',
                key: 'NroAtendimento'
            }
        },
        IDPaciente:{
            type: DataTypes.INTEGER,
            allowNull: false,
            reference:{
                model: 'Paciente',
                key: 'ID'
            }
        },
        AntecedentesPessoais:{
            type: DataTypes.TEXT,
            allowNull:true
        },
        DiagnosticoEntrada:{
            type: DataTypes.TEXT,
            allowNull:true
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
                ListaProblemas.belongsTo(models.Fichas, {
                    foreignKey: 'NroAtendimento'
                });
                ListaProblemas.belongsTo(models.Paciente,{
                    foreignKey: 'IDPaciente'
                });
            }
        },
        tableName: 'ListaProblemas',
        timestamps:false
    });
    return ListaProblemas;
};