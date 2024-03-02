const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('timeslot', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    number: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    starttime: {
      type: DataTypes.TIME,
      allowNull: true
    },
    endtime: {
      type: DataTypes.TIME,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'timeslot',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "timeslot_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
