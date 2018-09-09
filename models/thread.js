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
  Thread.associate = function(models) {
    // Associating Thread with Comment
    // When an Thread is deleted, also delete any associated comments
    Thread.hasMany(models.Comment, {
      onDelete: "cascade"
    });
  };
  return Thread;
};
