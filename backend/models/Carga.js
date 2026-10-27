const {DataTypes} = require('sequelize')
const db = require('../db/conn')

const Carga = db.define('Carga',{
    codCarga:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    descricao:{
        type: DataTypes.STRING(100),
        allowNull: false
    },
    peso:{
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    volume:{
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    rastreio:{
        type: DataTypes.STRING(100),
        allowNull: false
    },
    idMotorista:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            key: 'codMotorista',
            model: 'Motorista'
        }
    }
},{
    timestamps: false,
    tableName: 'Carga'
})

module.exports = Carga