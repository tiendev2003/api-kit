const router = require("express").Router();
const { getCategories } = require("../controllers/category.ctrl");

router.route("/").get(getCategories);

module.exports = router;
