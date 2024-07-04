const Router = require("express");
const router = new Router();
const deviceRouter = require("./deviceRouter");
const userRouter = require("./userRouter");
const categoryRouter = require("./categoryRouter");
const brandRouter = require("./brandRouter");
const ratingRouter = require("./ratingRouter");

router.use("/user", userRouter);
router.use("/category", categoryRouter);
router.use("/brand", brandRouter);
router.use("/device", deviceRouter);
router.use("/rating", ratingRouter);

module.exports = router;
