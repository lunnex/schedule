const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('pga_job', {
    jobid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    jobjclid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'pga_jobclass',
        key: 'jclid'
      }
    },
    jobname: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    jobdesc: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: ""
    },
    jobhostagent: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: ""
    },
    jobenabled: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    jobcreated: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    jobchanged: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    jobagentid: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "Agent that currently executes this job.",
      references: {
        model: 'pga_jobagent',
        key: 'jagpid'
      }
    },
    jobnextrun: {
      type: DataTypes.DATE,
      allowNull: true
    },
    joblastrun: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'pga_job',
    schema: 'pgagent',
    hasTrigger: true,
    timestamps: false,
    indexes: [
      {
        name: "pga_job_pkey",
        unique: true,
        fields: [
          { name: "jobid" },
        ]
      },
    ]
  });
};
