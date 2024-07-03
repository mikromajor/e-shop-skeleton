const ApiError = require("../error/ApiError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const { Basket, User } = require("../models/models");

const generateJwt = (id, email, role) => {
  return jwt.sign(
    { id, email, role },
    process.env.SECRET_KEY,
    { expiresIn: "24h" }
  );
};

//TODO: create function email & password  validation

class UserController {
  async registration(req, res, next) {
    let { email, password, role } = req.body;
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res
        .status(400)
        .json({ message: "Validation error =>", error });
    }

    // if (!email || !password) {
    //   return next(
    //     ApiError.badRequest(
    //       "Email or password are incorrect!!!"
    //     )
    //   );
    // }
    const candidate = await User.findOne({
      where: { email },
    });
    if (candidate) {
      return next(
        ApiError.badRequest("User with this email exist!!!")
      );
    }
    const hashPassword = await bcrypt.hash(password, 3);

    //TODO: it is very simple protection role
    // role =
    //   process.env.KEY_ADMIN === role ? "ADMIN" : "USER";
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

  async login(req, res, next) {
    const { email, password } = req.body;
    //Todo add email & password  validation
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return next(
        ApiError.internal("User not found ! ! !")
      );
    }
    let comparePassword = bcrypt.compareSync(
      password,
      user.password
    );
    if (!comparePassword) {
      return next(
        ApiError.internal("Password incorrect ! ! !")
      );
    }
    const token = generateJwt(
      user.id,
      user.email,
      user.role
    );

    return res.json({ token });
  }

  async check(req, res, next) {
    // res.json("OK");
    const token = generateJwt(
      req.user.id,
      req.user.email,
      req.user.role
    );
    return res.json({ token });
    // const { id } = req.query;
    // if (!id) {
    //   return next(
    //     ApiError.badRequest("It is not entered ID")
    //   );
    // }
    // res.json(id);
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
