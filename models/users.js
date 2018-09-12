module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define("Users", {
    username: DataTypes.STRING,
    password: DataTypes.TEXT
  });

  return Users;
};
