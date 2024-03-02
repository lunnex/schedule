const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('staff', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    fio: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    jobtitle: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'jobtitle',
        key: 'id'
      }
    },
    degree: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'degree',
        key: 'id'
      }
    },
    department: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'department',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'staff',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "staff_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
