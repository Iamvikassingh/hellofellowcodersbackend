const TeacherRegistration = require('../models/TeacherRegistrationModel');
const StudentRegistration = require('../models/StudentRegistrationModel');
const LoginDetail = require('../models/LoginModel');

// Create a new teacheruser
const TeacherRegisterUser = async (req, res) => {
    console.log('Received TeacherRegistration data:', req.body); // Log incoming data
    try {
        const newUser = new TeacherRegistration(req.body);
        await newUser.save();
        res.status(200).json({ message: "Teacher registered successfully", Teacher: newUser });
    } catch (error) {
        console.error('TeacherRegistration error:', error); // Log error for debugging
        res.status(400).json({ error: error.message });
    }
};

// Create a new studentUser
const StudentRegistrationUser = async (req, res) => {
    console.log('Received StudentRegistration data:', req.body); // Log incoming data
    try {
        const newStudentUser = new StudentRegistration(req.body);
        await newStudentUser.save();
        res.status(200).json({ message: "Student registered successfully", Student: newStudentUser });
    } catch (error) { // Include 'error' here
        console.error('StudentRegistration error:', error); // Log error for debugging
        res.status(400).json({ error: error.message });
    }
};


const checkLoginDetail = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        // Check in Teacher model
        let user = await TeacherRegistration.findOne({ email, password });
        if (user) {
            // User found in Teacher model
            const fullName = `${user.firstName} ${user.lastName}`;
            return res.status(200).json({ name: fullName, email: user.email });
        } else {
            // If not found in Teacher, check in Student model
            user = await StudentRegistration.findOne({ email, password });
            if (user) {
                // User found in Student model
                const fullName = `${user.firstName} ${user.lastName}`;
                return res.status(200).json({ name: fullName, email: user.email });
            }
        }

        // If user is not found in either model
        return res.status(404).json({ error: "Invalid credentials" });
        
    } catch (error) {
        return res.status(500).json({ error: "Server error" });
    }
};



// Get teacher users
const getUsers = async (req, res) => {
    try {
        const teacherusers = await TeacherRegistration.find();
        res.status(200).json(teacherusers);
    } catch (error) {
        console.error('Error fetching users:', error); // Log error for debugging
        res.status(500).json({ error: error.message });
    }
};

const getStudentUser = async (req, res) => {
    try {
        const studentusers = await StudentRegistration.find();
        res.status(200).json(studentusers);
    } catch (error) {
        console.error('Error fetching users:', error); // Log error for debugging
        res.status(500).json({ error: error.message });
    }
};


module.exports = { 
    getStudentUser,
    getUsers, 
    TeacherRegisterUser, 
    StudentRegistrationUser,
    checkLoginDetail
};
