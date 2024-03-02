const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('pga_jobagent', {
    jagpid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    jaglogintime: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    jagstation: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'pga_jobagent',
    schema: 'pgagent',
    timestamps: false,
    indexes: [
      {
        name: "pga_jobagent_pkey",
        unique: true,
        fields: [
          { name: "jagpid" },
        ]
      },
    ]
  });
};
