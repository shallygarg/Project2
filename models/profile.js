module.exports = function(sequelize, DataTypes) {
  var Profile = sequelize.define("Profile", {
    password: DataTypes.STRING
  });
  return Profile;
};
