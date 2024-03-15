const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const checkAuth = require('../middleware/authCheck');

const {
    getAllFeedback,
    addFeedback,
    getFeedbackById,
    deleteFeedback,
    updateFeedback
} = require('../controllers/feedbackController');


//Activating Authentification for Routers
router.use(checkAuth);

// GET all feedback
router.get('/', getAllFeedback);

// ADD a new feedback
router.post('/',  addFeedback);

// GET a feedback by ID
router.get('/:id', getFeedbackById);

// UPDATE a feedback with PUT by ID
router.put('/:id', updateFeedback);

// DELETE a feedback by ID
router.delete('/:id', deleteFeedback);


module.exports = router;










