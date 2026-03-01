import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class Profile extends Model {
    static associate(models) {
      // One User has One Profile
      Profile.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
        onDelete: "CASCADE"
      });
    }
  }

  Profile.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      phone: {
        type: DataTypes.STRING
      },
      githubUrl: {
        type: DataTypes.STRING
      },
      linkedinUrl: {
        type: DataTypes.STRING
      },
      skills: {
        type: DataTypes.TEXT
      },
      education: {
        type: DataTypes.TEXT
      },
      experience: {
        type: DataTypes.TEXT
      },
      bio: {
        type: DataTypes.TEXT
      },
      profileImage: {
        type: DataTypes.STRING
      }
    },
    {
      sequelize,
      modelName: "Profile"
    }
  );

  return Profile;
};