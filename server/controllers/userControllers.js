const ApiError = require("../error/ApiError");

class UserController {
  async registration(req, res) {}

  async login(req, res) {}

  async check(req, res, next) {
    const { id } = req.query;
    if (!id) {
      return next(
        ApiError.badRequest("It is not entered ID")
      );
    }
    res.json(id);
    // http://localhost:5001/api/user/auth
    //?id=5&message=sashka&my_param=ok
    // const query = req.query;
    // const { id, message, my_param } = query;
    // res.json(query);
    //{"id":"5","message":"sashka","my_param":"ok"}
    // res.json(my_param);
    // "ok"
    // res.json(" userController fire");
  }
}
module.exports = new UserController();
