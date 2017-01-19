/**
 * Created by raphael on 1/19/17.
 */
'use strict';
module.exports = function(sequelize, DataTypes) {
    var Telefone = sequelize.define('Telefone', {
        CPF: {type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            primaryKey: true
        },
        Telefone: {type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        TipoTelefone: DataTypes.INTEGER
    }, {
        classMethods: {
            associate: function(models) {
                Telefone.belongsTo(Pessoa,{
                    as: 'CPF',
                    foreignKey: 'CPF'
                });
            }
        },
        tableName: 'Telefone'
    });
    return Telefone;
};