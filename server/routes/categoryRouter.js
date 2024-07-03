const Router = require("express");
const router = new Router();
const categoryController = require("../controllers/categoryController");
const checkRoleMiddleware = require("../middleware/checkRoleMiddleware");

router.post(
  "/",
  checkRoleMiddleware("ADMIN"),
  categoryController.create
);
router.get("/", categoryController.getAll);

router.delete(
  "/",
  checkRoleMiddleware("ADMIN"),
  categoryController.delete
);

module.exports = router;