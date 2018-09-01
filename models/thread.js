module.exports = function(sequelize, DataTypes) {
  var Thread = sequelize.define("Thread", {
    text: DataTypes.STRING,
    description: DataTypes.TEXT
  });
  return Thread;
};
