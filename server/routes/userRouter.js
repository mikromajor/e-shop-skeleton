const Router = require("express");
const router = new Router();
const userController = require("../controllers/userControllers");
const authMiddleware = require("../middleware/authMiddleware");
const checkRole = require("../middleware/checkRoleMiddleware");

const { check } = require("express-validator");

const emailPasswordChecker = () => {
  return (
    check("email", "Email invalid").isEmail(),
    check(
      "password",
      "Password must have 6-12 signs"
    ).isLength({ min: 6, max: 12 })
  );
};

router.post(
  "/registration",
  emailPasswordChecker(),
  userController.registration
);
router.post(
  "/login",
  emailPasswordChecker(),
  userController.login
);
// router.get("/auth", authMiddleware, userController.check);
router.get("/auth", checkRole(""), userController.check);
module.exports = router;
