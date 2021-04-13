const express = require('express');
const Lessons = require("../models/dbHelperss");

const router = express.Router();   // método que viene con express

// for all endpoints starting with /api/messages
router.delete("/:id", (req, res) => {
    const { id } = req.params

    Lessons.removeMessage(id)
    .then(count => {
        if(count> 0) {
            res.status(200).json({ message: `Message with id ${id} successfully deleted`})
        } else {
            res.status(404).json({ message: "NO message with that ID"})
        }
    })
    .catch ( error => {
        res.status(500).json({ message: 'Error deleting that message'});
    });
});

module.exports = router;