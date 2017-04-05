/**
 * Created by raphael on 3/28/17.
 */
module.exports = function(sequelize, DataTypes) {
    var Internacao = sequelize.define('Internacao', {
        ID:{
            type: DataTypes.INTEGER,
            allowNull:false,
            unique:true,
            primaryKey:true,
            references:{
                model: 'Paciente',
                key: 'ID'
            }
        },
        DataInternacao: {
            type: DataTypes.DATE,
            allowNull: false,
            primaryKey:true
        },
        DataAlta: {
            type: DataTypes.DATE,
            allowNull: false
        }
    }, {
        classMethods: {
            associate: function (models) {
                Internacao.belongsTo(models.Paciente, {
                    foreignKey: 'ID'
                });
            }
        },
        tableName: 'Internacao',
        timestamps:false
    });
    return Internacao;
};