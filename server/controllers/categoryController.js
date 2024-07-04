const { Category } = require("../models/models"); // db
const ApiError = require("../error/ApiError");

class TypeController {
  async create(req, res) {
    const { name } = req.body; // POST has body
    const category = await Category.create({ name });
    return res.json(category);
  }

  async getAll(req, res) {
    //GET req does not have body
    const category = await Category.findAll();
    return res.json(category);
  }

  async getOne(req, res) {
    const { name } = req.params;
    const category = await Category.findOne({
      where: { name },
    });
    return res.json(category);
  }

  async delete(req, res) {
    const { name } = req.body; //DELETE has body
    await Category.destroy({
      where: { name: name },
    });
    const types = await Category.findAll();
    return res.json(types);
  }
}
module.exports = new TypeController();
