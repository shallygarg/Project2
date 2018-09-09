module.exports = function(sequelize, DataTypes) {
  var Thread = sequelize.define("Thread", {
    text: DataTypes.STRING,
    description: DataTypes.TEXT,
    likes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  });
  return Thread;
};
