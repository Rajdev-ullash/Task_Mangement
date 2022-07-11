const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/UsersController");
const TasksController = require("../controllers/TasksController");
const AuthVerifyMiddleware = require("../middleware/AuthVerifyMiddleware");

router.post("/registration", UsersController.registration);
router.post("/login", UsersController.login);
router.put(
  "/profileUpdate",
  AuthVerifyMiddleware,
  UsersController.profileUpdate
);

router.post("/createTask", AuthVerifyMiddleware, TasksController.createTask);
router.get(
  "/updateTaskStatus/:id/:status",
  AuthVerifyMiddleware,
  TasksController.updateTaskStatus
);
router.get(
  "/listTasksByStatus/:status",
  AuthVerifyMiddleware,
  TasksController.listTasksByStatus
);
router.get(
  "/taskStatusCount",
  AuthVerifyMiddleware,
  TasksController.taskStatusCount
);
router.delete(
  "/deleteTask/:id",
  AuthVerifyMiddleware,
  TasksController.deleteTask
);

module.exports = router;
