const Router = require("express");
const router = new Router();
const deviceController = require("../controllers/deviceController");
const authMiddleware = require("../middleware/authMiddleware");

router.post(
  "/",
  authMiddleware("ADMIN"),
  deviceController.create
);
router.get("/", deviceController.getAll);
router.get("/:id", deviceController.getOne);
router.delete(
  "/",
  authMiddleware("ADMIN"),
  deviceController.delete
);

module.exports = router;
