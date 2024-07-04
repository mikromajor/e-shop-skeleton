const { Brand } = require("../models/models"); // db
const ApiError = require("../error/ApiError");

class BrandController {
  async create(req, res) {
    //POST
    const { name } = req.body;
    const brand = await Brand.create({ name });
    return res.json(brand);
  }

  async getAll(req, res) {
    //GET
    // /brand?name=bmw&id=10
    // const {name, id}=req.query

    const brands = await Brand.findAll();
    return res.json(brands);
  }

  async getOne(req, res) {
    // /brand/bmw
    // "/:name"
    //  req.params.name === "bmw"
    const { name } = req.params;
    const brand = await Brand.findOne({
      where: { name },
    });
    return res.json(brand);
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
