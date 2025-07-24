const express = require('express');
const router = express.Router();


const {
    signup,
    login
} = require('../controllers/authController');




// To import jwt middleware to protect routes 
const verifyToken = require('../middleware/authMiddleware');


router.post("/signup", signup);
router.post("/login", login);


router.post("/", verifyToken, async (req, res) => {
  try {
    const task = new Task({ ...req.body, user: req.user.userId });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    console.error("Create Task Error:", err);
    res.status(500).json({ message: "Failed to create task" });
  }
});


module.exports = router;

