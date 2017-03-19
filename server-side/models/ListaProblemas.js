/**
 * Created by raphael on 3/14/17.
 */
'use strict';
module.exports = function(sequelize, DataTypes) {
    var ListaProblemas = sequelize.define('ListaProblemas', {
        NroAtendimento: { //FK to Evolucao
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            reference:{
                model: 'Evolucao',
                key: 'NroAtendimento'
            }
        },
        IDProblema:{
            type: DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true,
            allowNull:false
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
        tableName: 'ListaProblemas',
        timestamps:false
    });
    return ListaProblemas;
};