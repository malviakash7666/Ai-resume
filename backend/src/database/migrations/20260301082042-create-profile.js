export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("Profiles", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: "Users", key: "id" },
      onDelete: "CASCADE"
    },
    phone: Sequelize.STRING,
    githubUrl: Sequelize.STRING,
    linkedinUrl: Sequelize.STRING,
    skills: Sequelize.TEXT,
    education: Sequelize.TEXT,
    experience: Sequelize.TEXT,
    bio: Sequelize.TEXT,
    profileImage: Sequelize.STRING,
    createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal("CURRENT_TIMESTAMP") },
    updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal("CURRENT_TIMESTAMP") }
  });
}

export async function down(queryInterface) {
  await queryInterface.dropTable("Profiles");
}