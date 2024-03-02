const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('pga_jobclass', {
    jclid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    jclname: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'pga_jobclass',
    schema: 'pgagent',
    timestamps: false,
    indexes: [
      {
        name: "pga_jobclass_name",
        unique: true,
        fields: [
          { name: "jclname" },
        ]
      },
      {
        name: "pga_jobclass_pkey",
        unique: true,
        fields: [
          { name: "jclid" },
        ]
      },
    ]
  });
};
