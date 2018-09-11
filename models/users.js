module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define("Users", {
    email: DataTypes.STRING,
    password: DataTypes.TEXT
  });

  return Users;
};
