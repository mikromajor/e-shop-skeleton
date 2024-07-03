const { Device, DeviceInfo } = require("../models/models"); // db
const ApiError = require("../error/ApiError");
const uuid = require("uuid");
const path = require("path");

class DeviceController {
  async create(req, res, next) {
    try {
      let { name, price, typeId, brandId, info } = req.body;
      const { img } = req.files;
      const fileName = uuid.v4() + ".jpg";
      // img.mv("C/users/...");
      img.mv(
        path.resolve(__dirname, "..", "static", fileName)
      );

      const device = await Device.create({
        name,
        price,
        typeId,
        brandId,
        img: fileName,
      });

      if (info) {
        info = JSON.parse(info);
        info.forEach((i) =>
          DeviceInfo.create({
            title: i.title,
            description: i.description,
            deviceId: device.id,
          })
        );
      }

      return res.json(device);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res) {
    let { brandId, typeId, limit, page } = req.query; // let распостраняется на елементы обьекта

    limit = limit || 5;
    page = page || 1;
    let devices;
    let offset = limit * page - limit; // skip пропускаем количество товаров
    if (!brandId && !typeId) {
      devices = await Device.findAndCountAll({
        limit,
        offset,
      });
    }
    if (brandId && !typeId) {
      devices = await Device.findAndCountAll({
        where: { brandId },
        limit,
        offset,
      });
    }
    if (!brandId && typeId) {
      devices = await Device.findAndCountAll({
        where: { typeId },
        limit,
        offset,
      });
    }
    if (brandId && typeId) {
      devices = await Device.findAndCountAll({
        where: { brandId, typeId },
        limit,
        offset,
      });
    }

    return res.json(devices);
  }

  async getOne(req, res) {
    const { id } = req.params;
    const device = await Device.findOne({
      where: { id },
      include: [{ model: DeviceInfo, as: "infosiki" }],
    });
    return res.json(device);
  }

  async delete(req, res) {
    const { name } = req.body; //DELETE has body
    await Device.destroy({
      where: { name: name },
    });
    const devices = await Device.findAll();
    return res.json(devices);
  }
}
module.exports = new DeviceController();
