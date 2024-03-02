const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('pga_exception', {
    jexid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    jexscid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'pga_schedule',
        key: 'jscid'
      }
    },
    jexdate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    jextime: {
      type: DataTypes.TIME,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'pga_exception',
    schema: 'pgagent',
    hasTrigger: true,
    timestamps: false,
    indexes: [
      {
        name: "pga_exception_datetime",
        unique: true,
        fields: [
          { name: "jexdate" },
          { name: "jextime" },
        ]
      },
      {
        name: "pga_exception_jexscid",
        fields: [
          { name: "jexscid" },
        ]
      },
      {
        name: "pga_exception_pkey",
        unique: true,
        fields: [
          { name: "jexid" },
        ]
      },
    ]
  });
};
