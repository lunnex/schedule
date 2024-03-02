const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('housing', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    address: {
      type: DataTypes.STRING(1000),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'housing',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "housing_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
