const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('pga_schedule', {
    jscid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    jscjobid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'pga_job',
        key: 'jobid'
      }
    },
    jscname: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    jscdesc: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: ""
    },
    jscenabled: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    jscstart: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    jscend: {
      type: DataTypes.DATE,
      allowNull: true
    },
    jscminutes: {
      type: DataTypes.ARRAY(DataTypes.BOOLEAN),
      allowNull: false,
      //defaultValue: [f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f]
    },
    jschours: {
      type: DataTypes.ARRAY(DataTypes.BOOLEAN),
      allowNull: false,
      //defaultValue: [f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f]
    },
    jscweekdays: {
      type: DataTypes.ARRAY(DataTypes.BOOLEAN),
      allowNull: false,
      //defaultValue: [f,f,f,f,f,f,f]
    },
    jscmonthdays: {
      type: DataTypes.ARRAY(DataTypes.BOOLEAN),
      allowNull: false,
      //defaultValue: [f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f]
    },
    jscmonths: {
      type: DataTypes.ARRAY(DataTypes.BOOLEAN),
      allowNull: false,
      //defaultValue: [f,f,f,f,f,f,f,f,f,f,f,f]
    }
  }, {
    sequelize,
    tableName: 'pga_schedule',
    schema: 'pgagent',
    hasTrigger: true,
    timestamps: false,
    indexes: [
      {
        name: "pga_jobschedule_jobid",
        fields: [
          { name: "jscjobid" },
        ]
      },
      {
        name: "pga_schedule_pkey",
        unique: true,
        fields: [
          { name: "jscid" },
        ]
      },
    ]
  });
};
