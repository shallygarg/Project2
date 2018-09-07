module.exports = function(sequelize, DataTypes) {
  var Comment = sequelize.define("Comment", {
    // text: DataTypes.STRING,
    description: DataTypes.TEXT
    // threadId:  DataTypes.STRING
  });
  Comment.associate = function(models) {
    // We're saying that a Comment should belong to an Thread
    // A Comment can't be created without an Author due to the foreign key constraint
    Comment.belongsTo(models.Thread, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Comment;
};