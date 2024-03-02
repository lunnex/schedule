const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('pga_jobstep', {
    jstid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    jstjobid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'pga_job',
        key: 'jobid'
      }
    },
    jstname: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    jstdesc: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: ""
    },
    jstenabled: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    jstkind: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      comment: "Kind of jobstep: s=sql, b=batch"
    },
    jstcode: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    jstconnstr: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: ""
    },
    jstdbname: {
      type: "NAME",
      allowNull: false,
      defaultValue: ""
    },
    jstonerror: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: "f",
      comment: "What to do if step returns an error: f=fail the job, s=mark step as succeeded and continue, i=mark as fail but ignore it and proceed"
    },
    jscnextrun: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'pga_jobstep',
    schema: 'pgagent',
    timestamps: false,
    indexes: [
      {
        name: "pga_jobstep_jobid",
        fields: [
          { name: "jstjobid" },
        ]
      },
      {
        name: "pga_jobstep_pkey",
        unique: true,
        fields: [
          { name: "jstid" },
        ]
      },
    ]
  });
};
