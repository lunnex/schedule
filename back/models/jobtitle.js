const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('jobtitle', {
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
    tableName: 'jobtitle',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "jobtitle_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
