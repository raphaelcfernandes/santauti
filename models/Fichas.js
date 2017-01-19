/**
 * Created by raphael on 1/19/17.
 */
'use strict';
module.exports = function(sequelize, DataTypes) {
    var Fichas = sequelize.define('Fichas', {
        NroAtendimento: {type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            primaryKey: true
        },
        TipoFicha: {type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        classMethods: {
            associate: function(models) {
            }
        },
        tableName: 'Fichas'
    });
    return Fichas;
};