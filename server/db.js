const { Sequelize } = require("sequelize");

module.exports = new Sequelize(
  process.env.DB_NAME, // Название БД
  process.env.DB_USER, // Пользователь

  process.env.DB_PASSWORD, // ПАРОЛЬ
  {
    dialect: "postgres",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
  }
);

// // bad practices
// module.exports = new Sequelize(
//   "shop_5", // Название БД
//   "postgres", // Пользователь

//   "7891$", // ПАРОЛЬ
//   {
//     dialect: "postgres",
//     host: "localhost",
//     port: 5000,
//   }
// );
