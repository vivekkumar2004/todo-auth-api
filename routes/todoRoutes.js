const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
  getAverageRating,
} = require("../controllers/todoController");

router.use(authMiddleware);

router.post("/", createTodo);
router.get("/", getTodos);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);
router.get("/ratings/average", getAverageRating);

module.exports = router;