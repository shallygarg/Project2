module.exports = function(sequelize, DataTypes) {
  var Thread = sequelize.define("Thread", {
    text: DataTypes.STRING,
    description: DataTypes.TEXT,
    likes: DataTypes.INTEGER,
    imageFileName: DataTypes.TEXT
  });
  Thread.associate = function(models) {
    // Associating Thread with Comment
    // When an Thread is deleted, also delete any associated comments
    Thread.hasMany(models.Comment, {
      onDelete: "cascade"
    });
  };
  return Thread;
};
