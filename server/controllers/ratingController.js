const { Rating } = require("../models/models"); // db

class RatingController {
  async create(req, res) {
    let { userId, deviceId, rate } = req.body;
    const rating = await Rating.create({
      userId,
      deviceId,
      rate,
    });
    return res.json(rating);
  }

  async getAll(req, res) {
    //GET
    // /rating?name=bmw&id=10
    // const {name, id}=req.query

    const rating = await Rating.findAll();
    return res.json(rating);
  }

  async getOne(req, res) {
    //GET
    // /rating/11
    // "/:id"
    const { id } = req.params;
    const rating = await Rating.findOne({
      where: { id },
    });
    return res.json(rating);
  }
}
module.exports = new RatingController();
