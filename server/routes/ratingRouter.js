const Router = require("express");
const router = new Router();
const ratingController = require("../controllers/ratingController");

router.post("/", ratingController.create);
router.get("/", ratingController.getAll);
router.get("/:id", ratingController.getOne);

module.exports = router;
