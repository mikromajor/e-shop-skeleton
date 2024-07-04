const Router = require("express");
const router = new Router();
const categoryController = require("../controllers/categoryController");
const authMiddleware = require("../middleware/authMiddleware");

router.post(
  "/",
  authMiddleware("ADMIN"),
  categoryController.create
);
router.get("/", categoryController.getAll);

router.get("/:name", categoryController.getOne);

router.delete(
  "/",
  authMiddleware("ADMIN"),
  categoryController.delete
);

module.exports = router;
