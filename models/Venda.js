const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const Venda = sequelize.define("Venda", {
    cliente: {
        type: DataTypes.STRING,
        allowNull: false
    },
    produto: {
        type: DataTypes.STRING,
        allowNull: false
    },
    valor: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
});

module.exports = Venda;