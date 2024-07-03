const Router = require("express");
const router = new Router();
const userController = require("../controllers/userControllers");
const authMiddleware = require("../middleware/authMiddleware");
const { check } = require("express-validator");

router.post(
  "/registration",
  check("email", "Email invalid").isEmail(),
  check(
    "password",
    "Password must have 6-12 signs"
  ).isLength({ min: 6, max: 12 }),
  userController.registration
);
router.post(
  "/login",
  check("email", "Email invalid").isEmail(),
  check(
    "password",
    "Password must have 6-12 signs"
  ).isLength({ min: 6, max: 12 }),
  userController.login
);
router.get("/auth", authMiddleware, userController.check);

// router.get("/auth", (req, res) => {
//   res.json({ message: "! ! ! userRouter fire ! ! ! " });
// });//для того щоб не вписувати функції в роутер i не роздувати їх габарити створимо папку контролерc

module.exports = router;
