const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('degree', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'degree',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "degree_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
