const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('classroom', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    housingid: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'housing',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'classroom',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "classroom_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
