const jwt = require("jsonwebtoken");

module.exports = function (role) {
  return function (req, res, next) {
    if (req.method === "OPTIONS") {
      next();
    }
    try {
      // {Bearer dhds...}
      const token = req.headers.authorization.split(" ")[1];

      if (!token) {
        return res
          .status(401)
          .json({ message: "Unauthorized ! ! !" });
      }
      const decoded = jwt.verify(
        token,
        process.env.SECRET_KEY
      );
      if (role && decoded.role !== role) {
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
