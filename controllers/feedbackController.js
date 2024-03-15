  const mongoose = require('mongoose');
  const Feedback = require('../models/feedbackModel');


  // GET all feedback
  const getAllFeedback = async (req, res) => {
    try {
      const feedback = await Feedback.find({});
      res.status(200).json(feedback);
    } catch (error) {
      res.status(500).json({ message: err.message });
    }
  }


  // POST a new feedback
  const addFeedback = async (req, res) => {
    const { sender, message, rating } = req.body;
    const { email } = req.params;
    console.log("email:", email);

    if (!sender || !message || !rating) {
      return res.status(400).json({ message: 'All fields are required' });
    };

    try {
        const feedback = new Feedback({ sender, message, rating, email });
        await feedback.save();
        res.status(201).json(feedback);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET feedback by ID
const getFeedbackById = async (req, res) => {
    const { id } = req.params;
    console.log("id:", id);

    /*if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send("No feedback with id:", id);
    }*/

    try {
        const feedback = await Feedback.findById(id);
        if (!feedback) {
            return res.status(404).send("No feedback with id:", id);
        }
        res.status(200).json(feedback);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// DELETE feedback by ID
const deleteFeedback = async (req, res) => {
    const { id } = req.params;

    try {
        const feedback = await Feedback.findByIdAndDelete(id);
        if (!feedback) {
            return res.status(404).send("No feedback with id:", id);
        }
        res.status(200).json("Feedback deleted successfully!");
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// UPDATE feedback by ID
const updateFeedback = async (req, res) => {
    const { id } = req.params;

    try {
        const updatedFeedback = await Feedback.findByIdAndUpdate(
            { _id: id },
            { ...req.body},
            { new: true }
        );
        if (!updatedFeedback) {
            return res.status(404).send("No feedback with id:", id);
        }
        res.status(200).json(updatedFeedback);
        console.log("feedback:", updatedFeedback);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllFeedback,
    addFeedback,
    getFeedbackById,
    deleteFeedback,
    updateFeedback
};