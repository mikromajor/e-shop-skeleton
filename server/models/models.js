const sequelize = require("../db");

const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: "USER" },
});

const Basket = sequelize.define("basket", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
});

const BasketDevice = sequelize.define("basket_device", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
});

const Device = sequelize.define("device", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: { type: DataTypes.STRING, allowNull: false },
  price: { type: DataTypes.STRING, allowNull: false },
  rating: { type: DataTypes.INTEGER, defaultValue: 0 },
  img: { type: DataTypes.STRING, allowNull: false },
});

const Category = sequelize.define("category", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
});

const Brand = sequelize.define("brand", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
});

const TypeBrand = sequelize.define("type_brand", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
}); // additional table because relation many to many

const Rating = sequelize.define("rating", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  rate: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const DeviceInfo = sequelize.define("device_info", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

User.hasOne(Basket);
Basket.belongsTo(User);

User.hasMany(Rating);
Rating.belongsTo(User);

Basket.hasOne(BasketDevice);
BasketDevice.belongsTo(Basket);

BasketDevice.hasOne(Device);
Device.belongsTo(BasketDevice);

Device.hasMany(DeviceInfo, { as: "infosiki" });
DeviceInfo.belongsTo(Device);

Device.hasMany(Rating);
Rating.belongsTo(Device);

Category.hasMany(Device);
Device.belongsTo(Category);

Brand.hasMany(Device);
Device.belongsTo(Brand);

Category.belongsToMany(Brand, { through: TypeBrand });
Brand.belongsToMany(Category, { through: TypeBrand });

module.exports = {
  User,
  Basket,
  BasketDevice,
  Brand,
  Device,
  DeviceInfo,
  Rating,
  Category,
  TypeBrand,
};
