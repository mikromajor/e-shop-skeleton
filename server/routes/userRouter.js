const Router = require("express");
const router = new Router();
const userController = require("../controllers/userControllers");

router.post("/registration", userController.registration);
router.post("/login", userController.login);
router.get("/auth", userController.check);

// router.get("/auth", (req, res) => {
//   res.json({ message: "! ! ! userRouter fire ! ! ! " });
// });//для того щоб не вписувати функції в роутер i не роздувати їх габарити створимо папку контролерc

module.exports = router;
