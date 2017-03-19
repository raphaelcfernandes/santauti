/**
 * Created by raphael on 3/14/17.
 */
'use strict';
module.exports = function(sequelize, DataTypes) {
    var Pendencias = sequelize.define('Pendencias', {
        NroAtendimento: { //FK to Evolucao
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            reference:{
                model: 'Evolucao',
                key: 'NroAtendimento'
            }
        },
        IDPendencias:{
            type: DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true,
            allowNull:false
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
        },
        tableName: 'Pendencias',
        timestamps:false
    });
    return Pendencias;
};