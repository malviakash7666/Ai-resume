// models/Resume.js
import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class Resume extends Model {
    static associate(models) {
      Resume.belongsTo(models.User, { foreignKey: "userId", as: "user", onDelete: "CASCADE" });
    }
  }

  Resume.init({
    userId: { type: DataTypes.INTEGER, allowNull: false },
    fileName: DataTypes.STRING,
    fileUrl: DataTypes.STRING,
    parsedText: DataTypes.TEXT, // optional, AI ke liye store kar sakte ho
  }, { sequelize, modelName: "Resume" });

  return Resume;
};