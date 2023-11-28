const express = require('express')
const cors = require('cors');
const app = express()
const multer = require('multer')
const path = require('path')
const bodyparser = require('body-parser')
const csv = require('csvtojson')
const Admin = require('./db/Admin')
const Addstd = require('./db/Addstd')
const teacher = require('./db/Addteacher')
const User = require('./db/User')
const Facultie=require('./db/Facultie')
const Quiz = require('./db/Quizz')
const Notice=require('./db/Notice')
const pdfSchema = require('./db/TimeTable')
const fs = require('fs');

const port=5000;
// const { body, validationResult } = require("express-validator");
const { body, validationResult } = require("express-validator");
const TimeTable = require('./db/TimeTable');
// require('./db/config')
require('./db/dbconfig')


app.use(express.json())
app.use(cors())
app.use(bodyparser.urlencoded({ extended:true }));
app.use(express.static(path.resolve(__dirname, 'public')))







// Admin Signup
app.post("/adminsignup", async (req, res) => {
  let admin = new Admin(req.body);
  let result = await admin.save();
  res.send(result)
})




// Admin Login
app.get("/adminlogin", async (req, res) => {
  let admin = await Admin.findOne(req.body);
  if (req.body.email && req.body.password) {
    if (admin) {
      res.send(admin)
    }
    else {
      res.send({ result: "No Match Found" })
    }
  }
  else {
    res.send({ result: "No Match Found" })
  }

})





// app.post("/student",async(req,res)=>{
//   let student=new Student(req.body);
//   let std=await student.save();
//   res.send(std);
// })



// Add Student
app.post('/addstd', async (req, res) => {
  const { firstname, lastname, email, password, currentaddress, permanentaddress, institutename, highestqualification, gender, courses, contactnumber, alternatenumber, referalcode } = req.body;
  if (!firstname || !lastname || !email || !password || !currentaddress || !permanentaddress || !institutename || !highestqualification || !gender || !courses || !contactnumber || !alternatenumber || !referalcode) {
    res.json("please fill the form data");
  }

  try {
    const prestudent = await Addstd.findOne({ email: email });
    console.log(prestudent);

    if (prestudent) {
      res.json("This student is already registered in data");
    } else {
      const std = new Addstd({
        firstname, lastname, email, password, currentaddress, permanentaddress, institutename, highestqualification, gender, courses, contactnumber, alternatenumber, referalcode
      });
      await std.save();
      res.json(std)
      console.log(std);
    }
  } catch (error) {
    res.json(error)
  }



// Get Student Data
  app.get('/getdata', async (req, res) => {
    try {
      const std = await Addstd.find();
      res.json(std)
      console.log(std)
      // const corse_data = std.filter((item)=>{

      //   return item.courses == a

      // })

      // console.log(python_data)
      // res.json(python_data)

    } catch (error) {
      res.json(error)
    }
  })
})



// Student Profile View
app.get("/getuser/:id", async (req, res) => {
  try {

    console.log(req.params);
    const { id } = req.params;

    const userindividual = await Addstd.findById({ _id: id });
    console.log(userindividual);
    res.json(userindividual)
  } 
  catch (error) {
    res.json(error);

  }
})



// Update User
app.patch("/updateuser/:id",async(req,res)=>{
  try {
    const { id } = req.params;
    const updaQuizd = await Addstd.findByIdAndUpdate(id,req.body,{
      new:true
    });
    console.log(updaQuizd);
    res.json(updaQuizd)
  }
   catch (error) {
    res.json(error)
  }
})



// Delete Student
app.delete("/delete-student/:id" , async(req,res) =>{
  try {
    const { id } = req.params;
    const deleQuizd = await Addstd.findByIdAndDelete({_id: id});
    console.log(deleQuizd);
    res.json(deleQuizd)
  }
   catch (error) {
    res.json(error)
  }
})



// Add Faculty
app.post("/addfaculty",async(req,res)=>{
  const { firstname, lastname, email, password, currentaddress, permanentaddress, institutename, highestqualification, gender, courses, contactnumber, alternatenumber } = req.body;
  if (!firstname || !lastname || !email || !password || !currentaddress || !permanentaddress || !institutename || !highestqualification || !gender || !courses || !contactnumber || !alternatenumber ) {
    res.json("please fill the form data");
  }
  try {
    const prefaculty = await teacher.findOne({email:email})
    console.log(prefaculty)
    if(prefaculty){
      res.json("this is alrready registered")
    }
    else{
      const faculty = new teacher({
        firstname, lastname, email, password, currentaddress, permanentaddress, institutename, highestqualification, gender, courses, contactnumber, alternatenumber
      })
      await faculty.save()
      res.json(faculty)
      console.log(faculty)
    }
  } catch (error) {
    res.json(error)
  }
})



//get faculty data
app.get("/getfaculty",async(req,res)=>{
try {
  const facultydata = await teacher.find();
  res.json(facultydata)
  console.log(facultydata)
  
} catch (error) {
  res.json(error)
}
});



//get faculty view
app.get("/facultyview/:id",async(req,res)=>{
try {
  console.log(req.params);
  const {id} = req.params;

  const facultyview = await teacher.findById({_id:id})
  console.log(facultyview)
  res.json(facultyview)
} catch (error) {
  res.json(error)
}
})



//uodate faculty data
app.patch("/updatefaculty/:id",async(req,res)=>{
  try {
    const {id} = req.params;

    const updatefaculty = await teacher.findByIdAndUpdate(id,req.body,{
      new:true
    })
    res.json(updatefaculty)
  } catch (error) {
    res.json(error)
  }
});



//delete faculty data
app.delete("/deletefaculty/:id",async(req,res)=>{
  try {
    const {id} = req.params;

    const deletefaculty = await teacher.findByIdAndDelete({_id:id})
    res.json(deletefaculty)
  } catch (error) {
    res.json(error)
  }
})



// user signup
app.post("/usersignup", async (req, res) => {
  let user = new User(req.body);
  let result = await user.save();
  res.send(result)
})



//user Login
app.get("/userlogin", async (req, res) => {
  let user = await User.findOne(req.body);
  if (req.body.email && req.body.password) {
    if (user) {
      res.send(user)
    }
    else {
      res.send({ result: "No Match Found" })
    }
  }
  else {
    res.send({ result: "No Match Found" })
  }

})



//faculty Signup
app.post("/facultysignup", async (req, res) => {
  let faculty = new Facultie(req.body);
  let result = await faculty.save();
  res.send(result)
})



//faculty login
app.get("/facultylogin", async (req, res) => {
  let faculty = await Facultie.findOne(req.body);
  if (req.body.email && req.body.password) {
    if (faculty) {
      res.send(faculty)
    }
    else {
      res.send({ result: "No Match Found" })
    }
  }
  else {
    res.send({ result: "No Match Found" })
  }

})


//post quizz 
// app.post( "/addquiz",async (req, res) => {
//     try {
//       const {  question,
//         option1,
//         option2,
//         option3,
//         option4,
//         answer} = req.body;
//       const quiz = new Quiz({
       
//         question,
//         option1,
//         option2,
//         option3,
//         option4,
//         answer
       
//       });
//       const savedQuiz = await quiz.save();
//       res.json(savedQuiz);
//     } catch (error) {
//       console.error(error.message);
//       res.status(500).send("Internal Server Error");
//     }
//   }
// );


// app.post("/addquiz",async(req,res)=>{
//   let saveQuiz = new Quiz(req.body);
//   let result = await saveQuiz.save();
//   res.send(result) 
// })
app.post('/addquiz', async (req, res) => {
  try {
    // Create a new Quiz instance
    const newQuiz = new Quiz({
      title: req.body.title,
      questions: req.body.questions,
    });

    // Save the quiz to the database
    const result = await newQuiz.save();

    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Endpoint to get all quizzes
app.get('/quizzes', async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.json(quizzes);
  } catch (error) {
    console.error('Error fetching quizzes:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Endpoint to get a quiz by ID
app.get('/quizzes/:quizId', async (req, res) => {
  const quizId = req.params.quizId;

  try {
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).send('Quiz not found');
    }

    res.json(quiz);
  } catch (error) {
    console.error('Error fetching quiz by ID:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Endpoint to update a quiz by ID
app.put('/quizzes/:quizId', async (req, res) => {
  const quizId = req.params.quizId;

  try {
    const updatedQuiz = await Quiz.findByIdAndUpdate(quizId, req.body, { new: true });
    if (!updatedQuiz) {
      return res.status(404).send('Quiz not found');
    }

    res.json(updatedQuiz);
  } catch (error) {
    console.error('Error updating quiz by ID:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Endpoint to delete a quiz by ID
app.delete('/quizzes/:quizId', async (req, res) => {
  const quizId = req.params.quizId;

  try {
    const deletedQuiz = await Quiz.findByIdAndDelete(quizId);
    if (!deletedQuiz) {
      return res.status(404).send('Quiz not found');
    }

    res.json({ message: 'Quiz deleted successfully' });
  } catch (error) {
    console.error('Error deleting quiz by ID:', error);
    res.status(500).send('Internal Server Error');
  }
});





//  Get All the QUIZ using : GET "/api/quiz/getuser" .Login required
// app.get("/fetchallquiz", async (req, res) => {
//   try {
//     const quizs = await Quiz.find({ user: req.user.id });
//     res.json(quizs);
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send("Internal Server Error");
//   }
// });

// //  Fetch all the JSON for quiz collection
// app.get("/fetchallquiznoauthentication/:message", async (req, res) => {
//   try {
//     const quizs = await Quiz.find({ code: req.params.message});
//     res.json(quizs);

//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send("Internal Server Error");
//   }
// });





// //   Update 
// app.put("/updatequiz/:id",async (req, res) => {
// const { question, option1, option2, option3, option4, answe } = req.body;
// //Create a new quiz object
// const newQuiz = {};
// if (question) {
//   newQuiz.question = question;
// }
// if (option1) {
//   newQuiz.option1 = option1;
// }
// if (option2) {
//   newQuiz.option2 = option2;
// }
// if (option3) {
//   newQuiz.option3 = option3;
// }
// if (option4) {
//   newQuiz.option4 = option4;
// }
// if (answer) {
//   newQuiz.answer = answer;
// }
// if (title) {
//   newQuiz.title = title;
// }
// if (mcq) {
//   newQuiz.mcq = mcq;
// }
// if (code) {
//   newQuiz.code = code;
// }

// console.log(req.params.id);
// //Find the quiz to be updated and update it
// try {
//   var quiz = await Quiz.findById(req.params.id);
//   console.log(quiz);
//   if (!quiz) {
//     res.status(404).send("Not Found");
//   }
//   if (quiz.user.toString() !== req.user.id) {
//     return res.status(401).send("Not Allowed");
//   }
//   quiz = await Quiz.findByIdAndUpdate(
//     req.params.id,
//     { $set: newQuiz },
//     { new: true }
//   );
//   res.json({ quiz });
// } catch (error) {
//   console.error(error.message);
//   res.status(500).send("Internal Server Error");
// }
// });








// //  Update 
// app.put("/updatecode/:id",async (req, res) => {
// const { code } = req.body;
// //Create a new quiz object
// const newQuiz = {};
// if (code) {
//   newQuiz.code = code;
// }

// const numberHAI = (req.params.id)
//   console.log(numberHAI, typeof numberHAI)
// // console.log(req.params.id);
// //Find the quiz to be updated and update it
// try {
//   var quiz = await Quiz.find({"user": numberHAI});
//   // console.log(quiz);

//   if (!quiz) {
//     res.status(404).send("Not Found");
//   }
//   // if (quiz.user.toString() !== req.user.id) {
//   //   return res.status(401).send("Not Allowed");
//   // }

//   quiz = await Quiz.updateMany(
//     {"user": numberHAI},
//     { $set: newQuiz },
//     { new: true }
//   );
//   res.json({ quiz });
// } catch (error) {
//   console.error(error.message);
//   res.status(500).send("Internal Server Error");
// }
// });









// // ROUTE 4 : Delete an existing quiz using : DELETE "/api/quizs/deletequiz/:id" .Login required
// app.delete("/deletequiz/:id",async (req, res) => {
// //Find the quiz to be deleted and delete it
// try {
//   let quiz = await Quiz.findById(req.params.id);
//   if (!quiz) {
//     res.status(404).send("Not Found");
//   }
//   //Allow deletion only if userr owns this quiz
//   if (quiz.user.toString() !== req.user.id) {
//     //if not authenticated user
//     return res.status(401).send("Not Allowed");
//   }
//   quiz = await Quiz.findByIdAndDelete(req.params.id);
//   res.json({ Success: "Quiz has been deleted" });
// } catch (error) {
//   console.error(error.message);
//   res.status(500).send("Internal Server Error");
// }
// });


//Notice api

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
  destination:(req,file,cb) => {
    cb(null, './public/uploads')
  },
  filename:(req,file,cb) => {
    cb(null, file.originalname)
  }
})

const upload = multer({storage:storage});

app.post('/importCSV', upload.single('file'), async(req,res) => {
  try {
    const stdData = [];

    csv()
    .fromFile(req.file.path)
    .then(async (response)=> {
      for(var x= 0; x < response.length; x++){
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
          referalcode: response[x].ReferalCode

        })
      }

        await Addstd.insertMany(stdData)

      })
    res.status(200).send({success:true, message:"CSV uploaded successfully"})    

  } catch (error) {
  res.status(400).send({success:false, message:error.message})    
  }
})

// Set up multer storage for handling PDF uploads
const storage1 = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/uploads');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const fileExtension = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + fileExtension);
  },
});

// Create a multer instance for handling PDF uploads
const upload1 = multer({ storage: storage1 });

app.post('/upload-timetable', upload1.single('pdfFile'), async (req, res) => {
  try {
    const newPdf = new TimeTable({
      filename: req.file.filename,
      path: req.file.path,
    });

    await newPdf.save();
    res.json({ success: true, message: 'PDF uploaded successfully' });
    
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.get('/pdf/:id', async (req, res) => {
  try {
    const pdf = await TimeTable.findById(req.params.id);

    if (!pdf) {
      return res.status(404).json({ message: 'PDF not found' });
    }

    // Stream the PDF file to the client
    const fileStream = fs.createReadStream(pdf.path);
    fileStream.pipe(res);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



app.listen(port,()=>{
  console.log((`Server running on port ${port}`));
});