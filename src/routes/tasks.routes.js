const router = require("express").Router()
const {
    getTasks,
    postTask,
    putTask,
    deleteTask
} = require("../controllers/tasks.controller")
const validateJWT = require("../middlewares/validateJWT")

router.get("/tasks",[validateJWT], getTasks)
router.post("/task", [validateJWT], postTask)
router.put("/tasks/:id",[validateJWT],  putTask)
router.delete("/tasks/:id",deleteTask)

module.exports = router;