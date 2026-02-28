
import app from './app.js';
import db from './database/models/index.js';
import authRoutes from './routes/auth.routes.js'



db.sequelize.authenticate()
  .then(() => console.log("DB Connected"))
  .then(() => db.sequelize.sync({ alter: true }))
  .then(() => console.log("All tables synced"))
  .catch(err => console.error(err));
const PORT = 5000;

const startServer = async () => {
  try {
    await db.sequelize.authenticate();
    console.log("Database connected ✅");

    app.listen(PORT, () => {
      console.log(`Server running on ${PORT} 🚀`);
    });
  } catch (error) {
    console.error(error);
  }
};

app.use('/api/auth', authRoutes);

startServer();