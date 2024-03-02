const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('classtype', {
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
    tableName: 'classtype',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "classtype_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
