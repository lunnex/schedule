const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('semestr', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    startdate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    enddate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    changescheduledate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'semestr',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "semestr_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
