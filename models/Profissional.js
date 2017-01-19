/**
 * Created by raphael on 1/19/17.
 */
'use strict';
module.exports = function(sequelize, DataTypes) {
    var Profissional = sequelize.define('Profissional', {
        Registro: {type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            unique: true
        },
        CPF: {type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            primaryKey: true
        },
        Usuario: {type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        Senha: {
            type: DataTypes.STRING,
            allowNull: false
        },
        TipoProfissional: DataTypes.INTEGER
    }, {
        classMethods: {
            associate: function(models) {
                Profissional.belongsTo(models.Pessoa,{
                    as: 'CpfPessoa',
                    foreignKey: 'CPF'
                });
            }
        },
        tableName: 'Profissional'
    });
    return Profissional;
};