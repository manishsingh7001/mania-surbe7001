const express = require("express");
const cors = require("cors");
const app = express();
const multer = require("multer");
const path = require("path");
const bodyparser = require("body-parser");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const csv = require("csvtojson");
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const Admin = require("./db/Admin");
const Addstd = require("./db/Addstd");
const teacher = require("./db/Addteacher");
const User = require("./db/User");
const Facultie = require("./db/Facultie");
const Quiz = require("./db/Quizz");
const Notice = require("./db/Notice");
const OTP = require("./db/OTP")
const pdfSchema = require("./db/TimeTable");
const fs = require("fs");

const port = 5000;
// const { body, validationResult } = require("express-validator");
const { body, validationResult } = require("express-validator");
const TimeTable = require("./db/TimeTable");
// require('./db/config')
require("./db/dbconfig");

app.use(express.json());
app.use(cors());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, "public")));

// Admin Signup

app.post("/adminsignup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Name, email, and password are required" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        error: "Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, one number, and one special character."
      });
    }

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ error: "Email is already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = new Admin({
      name,
      email,
      password: hashedPassword,
    });

    const result = await admin.save();

    res.status(201).json({ message: "Admin successfully registered", adminId: result._id });
  } catch (error) {
    console.error('Error signing up admin:', error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// Admin Login
app.post("/adminlogin", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const admin = await Admin.findOne({ email });

    if (admin && await bcrypt.compare(password, admin.password)) {
      const token = jwt.sign({ adminId: admin._id, email: admin.email }, 'your-secret-key', { expiresIn: '1h' });

      res.json({ token, admin });
    } else {
      res.status(401).json({ error: "Invalid email or password" });
    }
  } catch (error) {
    console.error('Error logging in admin:', error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



//Student Registration

app.post("/addstd", async (req, res) => {
  const {
    firstname,
    lastname,
    email,
    password,
    currentaddress,
    permanentaddress,
    institutename,
    highestqualification,
    gender,
    courses,
    contactnumber,
    alternatenumber,
    referalcode,
  } = req.body;

  try {
    if (
      !firstname ||
      !lastname ||
      !email ||
      !password ||
      !currentaddress ||
      !permanentaddress ||
      !institutename ||
      !highestqualification ||
      !gender ||
      !courses ||
      !contactnumber ||
      !alternatenumber ||
      !referalcode
    ) {
      return res.status(400).json({ error: "Please fill in all the required fields" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        error: "Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, one number, and one special character."
      });
    }

    const prestudent = await Addstd.findOne({ email });

    if (prestudent) {
      return res.status(400).json({ error: "This email is already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const std = new Addstd({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      currentaddress,
      permanentaddress,
      institutename,
      highestqualification,
      gender,
      courses,
      contactnumber,
      alternatenumber,
      referalcode,
    });

    await std.save();

    res.status(201).json({ message: "Student successfully registered", studentId: std._id });
  } catch (error) {
    console.error('Error registering student:', error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

  // Get Student Data
  app.get("/getdata", async (req, res) => {
    try {
      // Retrieve data without any authentication or validation
      const std = await Addstd.find();
      res.json("Student Details Found Successfully",std);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  


// Student Profile View
app.get("/getuser/:id", async (req, res) => {
  try {
    console.log(req.params);
    const { id } = req.params;

    const userindividual = await Addstd.findById({ _id: id });
    res.json("Student Profile Fetched Successfully",userindividual);
  } catch (error) {
    res.json(error);
  }
});

// Update User
app.patch("/updateuser/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const existingUser = await Addstd.findById(id);

    if (!existingUser) {
      return res.status(404).json({ error: "User not found" });
    }

    const isDataChanged = !Object.keys(req.body).every(key =>
      JSON.stringify(existingUser[key]) === JSON.stringify(req.body[key])
    );

    if (!isDataChanged) {
      return res.status(400).json({ message: "No changes made" });
    }

    if (req.body.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(req.body.email)) {
        return res.status(400).json({ error: "Invalid email format" });
      }
    }

    if (req.body.password) {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordRegex.test(req.body.password)) {
        return res.status(400).json({
          error: "Invalid password format. Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one special character.",
        });
      }

      req.body.password = await bcrypt.hash(req.body.password, 10);
    }

    const updatedUser = await Addstd.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete Student
app.delete("/delete-student/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedStudent = await Addstd.findByIdAndDelete({ _id: id });

    if (deletedStudent) {
      res.json({ message: `Student with ID ${id} successfully deleted` });
    } else {
      res.status(404).json({ error: `Student with ID ${id} not found` });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// Add Faculty
app.post("/addfaculty", async (req, res) => {
  const {
    firstname,
    lastname,
    email,
    password,
    currentaddress,
    permanentaddress,
    institutename,
    highestqualification,
    gender,
    courses,
    contactnumber,
    alternatenumber,
  } = req.body;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      error: "Invalid password format. Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one special character.",
    });
  }

  const requiredFields = [
    firstname,
    lastname,
    currentaddress,
    permanentaddress,
    institutename,
    highestqualification,
    gender,
    courses,
    contactnumber,
    alternatenumber,
  ];

  if (requiredFields.some(field => !field)) {
    return res.status(400).json("Please fill in all required form data");
  }

  try {
    const prefaculty = await teacher.findOne({ email: email });

    if (prefaculty) {
      return res.status(409).json("This email is already registered");
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);

      const faculty = new teacher({
        firstname,
        lastname,
        email,
        password: hashedPassword,
        currentaddress,
        permanentaddress,
        institutename,
        highestqualification,
        gender,
        courses,
        contactnumber,
        alternatenumber,
      });

      await faculty.save();
      return res.status(201).json(faculty);
    }
  } catch (error) {
    return res.status(500).json(error);
  }
});

//get faculty data
app.get("/getfaculty", async (req, res) => {
  try {
    const facultydata = await teacher.find();

    if (!facultydata || facultydata.length === 0) {
      return res.json({ message: "No faculty members found" });
    }

    res.json({ message: "Faculty information retrieved successfully", data: facultydata });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});


//get faculty view
app.get("/facultyview/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const facultyview = await teacher.findById({ _id: id });

    if (!facultyview) {
      return res.status(404).json({ error: "Faculty not found" });
    }

    res.json({ message: "Faculty information retrieved successfully", data: facultyview });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});


//uodate faculty data
app.patch("/updatefaculty/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (req.body.email && !emailRegex.test(req.body.email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    // Validate password format
    if (req.body.password) {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordRegex.test(req.body.password)) {
        return res.status(400).json({
          error: "Invalid password format. Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one special character.",
        });
      }
      // Hash the new password before updating
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }

    const updatefaculty = await teacher.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    
    if (!updatefaculty) {
      return res.status(404).json({ error: "Faculty not found" });
    }

    res.json(updatefaculty);
  } catch (error) {
    res.status(500).json(error);
  }
});

//delete faculty data
app.delete("/deletefaculty/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletefaculty = await teacher.findByIdAndDelete({ _id: id });
    
    if (!deletefaculty) {
      return res.status(404).json({ error: "Faculty not found. Deletion unsuccessful" });
    }

    res.json({ message: "Faculty Deleted Successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
});
// user signup
app.post("/usersignup", async (req, res) => {
  let user = new User(req.body);
  let result = await user.save();
  res.send(result);
});

//user Login
app.get("/userlogin", async (req, res) => {
  let user = await User.findOne(req.body);
  if (req.body.email && req.body.password) {
    if (user) {
      res.send(user);
    } else {
      res.send({ result: "No Match Found" });
    }
  } else {
    res.send({ result: "No Match Found" });
  }
});

//faculty Signup
app.post("/facultysignup", async (req, res) => {
  let faculty = new Facultie(req.body);
  let result = await faculty.save();
  res.send(result);
});

//faculty login
app.post("/facultylogin", async (req, res) => {
  try {
    const { email, password } = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!password || !passwordRegex.test(password)) {
      return res.status(400).json({
        error: "Invalid password format. Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one special character.",
      });
    }

    const faculty = await teacher.findOne({ email });

    if (faculty) {
      const passwordMatch = await bcrypt.compare(password, faculty.password);

      if (passwordMatch) {
        return res.json({ message: "Login successful", faculty });
      } else {
        return res.status(401).json({ error: "Incorrect password" });
      }
    } else {
      return res.status(404).json({ error: "Faculty not found" });
    }
  } catch (error) {
    console.error('Error during faculty login:', error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.post("/addquiz", async (req, res) => {
  try {
    const newQuiz = new Quiz({
      title: req.body.title,
      questions: req.body.questions,
    });

    const result = await newQuiz.save();

    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Endpoint to get all quizzes
app.get("/quizzes", async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.json(quizzes);
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Endpoint to get a quiz by ID
app.get("/quizzes/:quizId", async (req, res) => {
  const quizId = req.params.quizId;

  try {
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).send("Quiz not found");
    }

    res.json(quiz);
  } catch (error) {
    console.error("Error fetching quiz by ID:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Endpoint to update a quiz by ID
app.put("/quizzes/:quizId", async (req, res) => {
  const quizId = req.params.quizId;

  try {
    const updatedQuiz = await Quiz.findByIdAndUpdate(quizId, req.body, {
      new: true,
    });
    if (!updatedQuiz) {
      return res.status(404).send("Quiz not found");
    }

    res.json(updatedQuiz);
  } catch (error) {
    console.error("Error updating quiz by ID:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Endpoint to delete a quiz by ID
app.delete("/quizzes/:quizId", async (req, res) => {
  const quizId = req.params.quizId;

  try {
    const deletedQuiz = await Quiz.findByIdAndDelete(quizId);
    if (!deletedQuiz) {
      return res.status(404).send("Quiz not found");
    }

    res.json({ message: "Quiz deleted successfully" });
  } catch (error) {
    console.error("Error deleting quiz by ID:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post('/submitquiz/:quizId', async (req, res) => {
  const quizId = req.params.quizId;
  const submittedAnswers = req.body.answers;
  const userId = req.body.userId; 
  try {
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).send('Quiz not found');
    }

    let score = 0;
    quiz.questions.forEach((question, index) => {
      if (submittedAnswers[index] === question.correctOptionIndex) {
        score++;
      }
    });

    quiz.scores.push({ userId, score });
    await quiz.save();

    res.json({ score });
  } catch (error) {
    console.error('Error submitting quiz:', error);
    res.status(500).send('Internal Server Error');
  }
});



// getnotice
app.post("/getNotice", async (req, res) => {
  try {
    let notice = await Notice.find(req.body);
    if (notice) {
      res.json({ success: true, message: "Notice Get Successfully", notice });
    } else {
      res.status(404).json({ success: false, message: "No Notice Available!" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// addnotice
app.post("/addNotice", async (req, res) => {
  let { link, description, title, type } = req.body;
  try {
    let notice = await Notice.findOne({ link, description, title, type });
    if (notice) {
      return res
        .status(400)
        .json({ success: false, message: "Notice Already Exists!" });
    }
    await Notice.create({
      link,
      description,
      title,
      type,
    });
    const data = {
      success: true,
      message: "Notice Added Successfully",
    };
    res.json(data);
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

//updatenotice
app.post("/updateNotice/:id", async (req, res) => {
  let { link, description, title, type } = req.body;
  try {
    let notice = await Notice.findByIdAndUpdate(req.params.id, {
      link,
      description,
      title,
      type,
    });
    if (!notice) {
      return res
        .status(400)
        .json({ success: false, message: "No Notice Available!" });
    }
    res.json({
      success: true,
      message: "Notice Updated Successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

//deletenotice
app.delete("/deleteNotice/:id", async (req, res) => {
  try {
    let notice = await Notice.findByIdAndDelete(req.params.id);
    if (!notice) {
      return res
        .status(400)
        .json({ success: false, message: "No Notice Available!" });
    }
    res.json({
      success: true,
      message: "Notice Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

//upload csv file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/importCSV", upload.single("file"), async (req, res) => {
  try {
    const stdData = [];

    csv()
      .fromFile(req.file.path)
      .then(async (response) => {
        for (var x = 0; x < response.length; x++) {
          stdData.push({
            firstname: response[x].FirstName,
            lastname: response[x].LastName,
            email: response[x].Email,
            password: response[x].Password,
            currentaddress: response[x].CurrentAddress,
            permanentaddress: response[x].PermanentAddress,
            institutename: response[x].InstituteName,
            highestqualification: response[x].HighestQualification,
            gender: response[x].Gender,
            courses: response[x].Courses,
            contactnumber: response[x].ContactNumber,
            alternatenumber: response[x].AlternateNumber,
            referalcode: response[x].ReferalCode,
          });
        }

        await Addstd.insertMany(stdData);
      });
    res
      .status(200)
      .send({ success: true, message: "CSV uploaded successfully" });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
});

// Set up multer storage for handling PDF uploads
const storage1 = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExtension = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + fileExtension);
  },
});

// Create a multer instance for handling PDF uploads
const upload1 = multer({ storage: storage1 });

app.post("/upload-timetable", upload1.single("pdfFile"), async (req, res) => {
  try {
    const newPdf = new TimeTable({
      filename: req.file.filename,
      path: req.file.path,
    });

    await newPdf.save();
    res.json({ success: true, message: "PDF uploaded successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.get("/pdf/:id", async (req, res) => {
  try {
    const pdf = await TimeTable.findById(req.params.id);

    if (!pdf) {
      return res.status(404).json({ message: "PDF not found" });
    }

    // Stream the PDF file to the client
    const fileStream = fs.createReadStream(pdf.path);
    fileStream.pipe(res);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Forgot Password
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'nandwana.utkarsh2003@gmail.com',
    pass: 'kojc hlhu bhig mcxg',
  },
});

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

function isValidPassword(password) {
  // Password must have 8 characters, one special character, one uppercase, and one lowercase
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
}

// Endpoint for sending OTP and redirecting to change password
app.post('/send-otp', async (req, res) => {
  const { email } = req.body;

  try {
    // Look up the user in the database to get the role
    const adminUser = await Admin.findOne({ email });
    const facultyUser = await teacher.findOne({ email });
    const studentUser = await Addstd.findOne({ email });

    if (adminUser) {
      role = 'admin';
    } else if (facultyUser) {
      role = 'faculty';
    } else if (studentUser) {
      role = 'student';
    } else {
      return res.status(404).json({ message: 'User not found.' });
    }

    let user;
    switch (role) {
      case 'admin':
        user = adminUser;
        break;
      case 'faculty':
        user = facultyUser;
        break;
      case 'student':
        user = studentUser;
        break;
      default:
        return res.status(400).json({ message: 'Invalid role.' });
    }

    const otp = generateOTP();
    const otpExpiration = Date.now() + 300000; // OTP expires in 5 minutes

    // Save OTP to the OTP collection
    await OTP.create({ email, otp, expiration: new Date(otpExpiration) });

    const mailOptions = {
      from: 'your_email@gmail.com',
      to: email,
      subject: 'Verification OTP',
      text: `Your OTP for verification is: ${otp}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
    });

    res.send('OTP sent to registered email');
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error.' });
  }
});

app.post('/change-password', async (req, res) => {
  const { email, otp, newPassword } = req.body;

  try {
    // Look up the user in the database
    const user = await Admin.findOne({ email }) || await teacher.findOne({ email }) || await Addstd.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Look up the OTP in the OTP collection
    const storedOTP = await OTP.findOne({ email, otp });

    if (!storedOTP || storedOTP.expiration < Date.now()) {
      return res.status(400).json({ message: 'Invalid or expired OTP.' });
    }



    if (!isValidPassword(newPassword)) {
      return res.status(400).json({ message: 'Invalid password. Please choose a password with at least 8 characters, one uppercase letter, one lowercase letter, one digit, and one special character.' });
    }


    // Hash the new password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);


    user.password = hashedPassword;
    await user.save();

   // Clear the OTP data
   await OTP.deleteOne({ email, otp });

    res.json({ message: 'Password changed successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error.' });
  }
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
