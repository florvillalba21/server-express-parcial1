const router = require("express").Router()
const {
    getTasks,
    postTask,
    putTask,
    deleteTask
} = require("../controllers/tasks.controller")

router.get("/tasks", getTasks)
router.post("/tasks",  postTask)
router.put("/tasks/:id",  putTask)
// router.delete("/tasks/:id",deleteTask)

module.exports = router;