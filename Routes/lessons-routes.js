const express = require('express');
const Lessons = require("../models/dbHelperss");

const router = express.Router();   // método que viene con express

// all endpoints are for /api/lessosn/
// no necesitamos /api/lessons/
router.post('', (req, res) => {
    Lessons.add(req.body)
    .then(lesson => {
        res.status(200).json(lesson)
    })
    .catch(error => {
        res.status(500).json({ message: "cannot add lesson" });
    });
});

router.get('', (req, res) => {
    Lessons.find()
    .then(lessons => {
        res.status(200).json(lessons)
    })
    .catch( error => {
        res.status(500).json({message: "Unable to retrieve lessons"})
    })
})

router.get('/:id', (req, res) => {
    const { id } = req.params;
    Lessons.findById(id)
    .then(lesson => {
        if (lesson){
            res.status(200).json(lesson)
        } else {
            res.status(404).json({ message: "Record not found" })
        }
    })
    .catch(error => {
        restart.status(500).json({message: 'Unable to perform operation'})
    })
})

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    Lessons.remove(id)
    .then(count => {
        if (count > 0){
            res.status(200).json({ message: 'Succesfully deleted'})
        }
        else {
            res.status(404).json({message: 'Unable to locate record'})
        }
    })
    .catch( error => {
        res.status(500).json({ message: 'Unable to perform operation' })
    })
})


router.patch('/:id', (req, res) => {
    const { id } = req.params
    const changes = req.body

    Lessons.update(id, changes)
    .then(lesson => {
        if (lesson){
            res.status(200).json(lesson)
        } else {
            res.status(404).json({ message: 'Record not found'})
        }
    })
    .catch ( err => {
        res.status(500).json({ message: 'Error updating record' })
    });
});

router.post('/:id/messages', (req, res) => {
    const { id } = req.params;

    Lessons.findLessonMessage(id)
    .then(lesson => {
        res.status(200).json(lessons)
    })
    .catch(error => {
        res.status(500).json({message: "Error page not founf"})
    });
});


module.exports = router;