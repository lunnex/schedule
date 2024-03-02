const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('subject', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(1000),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'subject',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "subject_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
