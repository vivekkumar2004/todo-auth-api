const Todo = require("../models/Todo");

exports.createTodo = async (req, res) => {
  try {
    const { title, description, rating } = req.body;
    const todo = await Todo.create({ user: req.user, title, description, rating });
    res.status(201).json(todo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTodos = async (req, res) => {
  const todos = await Todo.find({ user: req.user });
  res.json(todos);
};

exports.updateTodo = async (req, res) => {
  const todo = await Todo.findOneAndUpdate(
    { _id: req.params.id, user: req.user },
    req.body,
    { new: true }
  );
  res.json(todo);
};

exports.deleteTodo = async (req, res) => {
  await Todo.findOneAndDelete({ _id: req.params.id, user: req.user });
  res.json({ message: "Deleted" });
};

exports.getAverageRating = async (req, res) => {
  const result = await Todo.aggregate([
    { $match: { user: req.user } },
    {
      $group: {
        _id: "$user",
        averageRating: { $avg: "$rating" },
      },
    },
  ]);
  res.json(result[0] || { averageRating: 0 });
};