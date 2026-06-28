const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// @route   POST /api/students
// @desc    Add a new student
router.post('/', async (req, res) => {
  try {
    const { name, email, course, enrollmentDate } = req.body;

    const newStudent = new Student({
      name,
      email,
      course,
      enrollmentDate,
    });

    const savedStudent = await newStudent.save();
    res.status(201).json(savedStudent);
  } catch (error) {
    res.status(500).json({ message: 'Error adding student', error: error.message });
  }
});

// @route   GET /api/students
// @desc    Get all students
router.get('/', async (req, res) => {
  try {
    const students = await Student.find().sort({ enrollmentDate: -1 });
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching students', error: error.message });
  }
});

module.exports = router;
// @route   DELETE /api/students/:id
// @desc    Delete a student by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);

    if (!deletedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.status(200).json({ message: 'Student deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting student', error: error.message });
  }
});