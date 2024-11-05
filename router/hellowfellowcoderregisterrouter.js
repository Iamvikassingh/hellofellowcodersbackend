const express = require('express');
const { TeacherRegisterUser,
    getUsers,
    StudentRegistrationUser,
    getStudentUser,
    checkLoginDetail
} = require('../controller/registrationController');
const router = express.Router();

// Register a new user
router.post('/registerteacher', TeacherRegisterUser);
router.post('/registerstudent', StudentRegistrationUser);
router.post('/logindetail',checkLoginDetail);


// Get all teacher data
router.get('/teachers', getUsers);

//Get all student data
router.get('/students',getStudentUser);

module.exports = router;
