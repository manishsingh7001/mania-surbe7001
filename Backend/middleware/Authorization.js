const Admin = require("../db/Admin");
const Addstd = require("../db/Addstd");
const Teacher = require("../db/Addteacher");

const checkRole = (allowedRoles) => {
  return async (req, res, next) => {
    try {
      const userId = req.userId;
      console.log('User ID:', userId);
      

      if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
      }



      // Check if the user is an Admin
      const admin = await Admin.findById(userId);
      console.log('Admin:', admin);
      if (admin && allowedRoles.includes('admin')) {
        return next();
      }

      // Check if the user is a Faculty
      const faculty = await Teacher.findById(userId);
      console.log('Faculty:', faculty);
      if (faculty && allowedRoles.includes('faculty')) {
        return next();
      }

      // Check if the user is a Student
      const student = await Addstd.findById(userId);
      console.log('Student:', student);
      if (student && allowedRoles.includes('student')) {
        return next();
      }

      return res.status(403).json({ message: 'Unauthorized user' });
    } catch (error) {
      console.error('Error checking role:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };
};

module.exports = checkRole;
