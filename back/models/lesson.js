const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('lesson', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    classroom: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'classroom',
        key: 'id'
      }
    },
    timeslot: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'timeslot',
        key: 'id'
      }
    },
    subject: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'subject',
        key: 'id'
      }
    },
    staff: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'staff',
        key: 'id'
      }
    },
    studentgroup: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'studentgroup',
        key: 'id'
      }
    },
    classtype: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'classtype',
        key: 'id'
      }
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    semestr: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'semestr',
        key: 'id'
      }
    },
    dayofweek: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    typeofweek: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    frequency: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'lesson',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "lesson_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
