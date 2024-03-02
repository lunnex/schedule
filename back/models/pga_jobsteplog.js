const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('pga_jobsteplog', {
    jslid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    jsljlgid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'pga_joblog',
        key: 'jlgid'
      }
    },
    jsljstid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'pga_jobstep',
        key: 'jstid'
      }
    },
    jslstatus: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: "r",
      comment: "Status of job step: r=running, s=successfully finished,  f=failed stopping job, i=ignored failure, d=aborted"
    },
    jslresult: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "Return code of job step"
    },
    jslstart: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    jslduration: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    jsloutput: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'pga_jobsteplog',
    schema: 'pgagent',
    timestamps: false,
    indexes: [
      {
        name: "pga_jobsteplog_jslid",
        fields: [
          { name: "jsljlgid" },
        ]
      },
      {
        name: "pga_jobsteplog_pkey",
        unique: true,
        fields: [
          { name: "jslid" },
        ]
      },
    ]
  });
};
