/**
 * Created by raphael on 1/19/17.
 */
'use strict';
var bcrypt = require('bcrypt-nodejs');
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
            validPassword: function(password, passwd, done, user){
                bcrypt.compare(password, passwd, function(err, isMatch){
                    if (err) console.log(err)
                    if (isMatch) {
                        return done(null, user)
                    } else {
                        return done(null, false)
                    }
                })
            },
            associate: function(models) {
                Profissional.belongsTo(models.Pessoa,{
                    as: 'CpfPessoa',
                    foreignKey: 'CPF'
                });
            }
        },
        tableName: 'Profissional',timestamps:false
    });
    Profissional.hook('beforeCreate', function(user, fn){
        var salt = bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
            return salt
        });
        bcrypt.hash(user.password, salt, null, function(err, hash){
            if(err) return next(err);
            user.password = hash;
            return fn(null, user)
        });
    });
    return Profissional;
};