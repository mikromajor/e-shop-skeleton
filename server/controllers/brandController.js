const { Brand } = require("../models/models"); // db
const ApiError = require("../error/ApiError");

class BrandController {
  async create(req, res) {
    const { name } = req.body;
    const brand = await Brand.create({ name });
    return res.json(brand);
  }

  async getAll(req, res) {
    const brands = await Brand.findAll();
    return res.json(brands);
  }

  async getOne(req, res) {
    const { name } = req.params;
    const device = await Brand.findOne({
      where: { name },
    });
    return res.json(device);
  }

  async delete(req, res) {
    const { name } = req.body; //DELETE has body
    await Brand.destroy({
      where: { name: name },
    });
    const brand = await Brand.findAll();
    return res.json(brand);
  }
}
module.exports = new BrandController();
