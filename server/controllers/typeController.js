const { Type } = require("../models/models"); // db
const ApiError = require("../error/ApiError");

class TypeController {
  async create(req, res) {
    const { name } = req.body; // POST has body
    const type = await Type.create({ name });
    return res.json(type);
  }

  async getAll(req, res) {
    //GET req does not have body
    const types = await Type.findAll();
    return res.json(types);
  }

  async delete(req, res) {
    const { name } = req.body; //DELETE has body
    await Type.destroy({
      where: { name: name },
    });
    const types = await Type.findAll();
    return res.json(types);
  }
}
module.exports = new TypeController();
