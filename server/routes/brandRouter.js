const Router = require("express");
const router = new Router();
const brandController = require("../controllers/brandController");
const authMiddleware = require("../middleware/authMiddleware");

router.post(
  "/",
  authMiddleware("ADMIN"),
  brandController.create
);
router.get("/:name/:key/:val", brandController.getOne);

router.get("/", brandController.getAll);

router.delete(
  "/",
  authMiddleware("ADMIN"),
  brandController.delete
);
// router.delete("/");

module.exports = router;
