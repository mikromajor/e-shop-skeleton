const jwt = require("jsonwebtoken");

module.exports = function (role) {
  return function (req, res, next) {
    if (req.method === "OPTIONS") {
      next();
    }
    try {
      const token = req.headers.authorization.split(" ")[1]; // Bearer
      if (!token) {
        return res
          .status(401)
          .json({ message: "Unauthorized ! ! !" });
      }
      const decoded = jwt.verify(
        token,
        process.env.SECRET_KEY
      );
      if (decoded.role !== role) {
        res
          .status(403)
          .json({ message: "You don't have access ! ! !" });
      }
      req.user = decoded;
      next();
    } catch (e) {
      res
        .status(401)
        .json({ message: "Unauthorized ! ! !" });
    }
  };
};
