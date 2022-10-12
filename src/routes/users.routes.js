const router = require("express").Router();

const {
  getUsers,
  postUser,
  putUser,
  deleteUser,
} = require("../controllers/users.controller");
const validateJWT = require("../middlewares/validateJWT");

router.get("/users", [validateJWT], getUsers);
router.post("/user", postUser);
router.put("/user",[validateJWT], putUser);
router.delete("/user/:id",[validateJWT], deleteUser);

module.exports = router;
