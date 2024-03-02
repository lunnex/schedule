const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('pga_joblog', {
    jlgid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    jlgjobid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'pga_job',
        key: 'jobid'
      }
    },
    jlgstatus: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: "r",
      comment: "Status of job: r=running, s=successfully finished, f=failed, i=no steps to execute, d=aborted"
    },
    jlgstart: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    jlgduration: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'pga_joblog',
    schema: 'pgagent',
    timestamps: false,
    indexes: [
      {
        name: "pga_joblog_jobid",
        fields: [
          { name: "jlgjobid" },
        ]
      },
      {
        name: "pga_joblog_pkey",
        unique: true,
        fields: [
          { name: "jlgid" },
        ]
      },
    ]
  });
};
