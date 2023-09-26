const router = require("express").Router();
const { getUsers } = require("../controllers/user.ctrl");

router.route("/").get(getUsers);

module.exports = router;
