const ApiError = require("../error/ApiError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Basket, User } = require("../models/models");

const generateJwt = (id, email, role) => {
  return jwt.sign(
    { id, email, role },
    process.env.SECRET_KEY,
    { expiresIn: "24h" }
  );
};

class UserController {
  async registration(req, res, next) {
    const { email, password, role } = req.body;

    if (!email || !password) {
      return next(
        ApiError.badRequest(
          "Email or password are incorrect!!!"
        )
      );
    }
    const candidate = await User.findOne({
      where: { email },
    });
    if (candidate) {
      return next(
        ApiError.badRequest("User with this email exist!!!")
      );
    }
    const hashPassword = await bcrypt.hash(password, 3);
    const user = await User.create({
      email,
      role,
      password: hashPassword,
    });

    const basket = await Basket.create({ userId: user.id });
    const token = generateJwt(
      user.id,
      user.email,
      user.role
    );

    return res.json({ token });
  }

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
