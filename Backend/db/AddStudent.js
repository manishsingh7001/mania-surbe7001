const mongoose = require('mongoose');

const AddStudentSchema = new mongoose.Schema({
    firstName: String,
    LastName: String,
    Email:
    {
        type: String,
        
        required: [true, "please enter your Email"],
        
        // validate: [validator, isEmail, "please enter a valid Email"],
    },
    Password: 
     {
        type: String,
        require: [true, "please enter your password"],
        minLength: [8, "password should have more than 8 character"],
        Select: false,
    },
    CurrentAddress: String,
    PermamentAddress: String,
    InstituteName: String,
    HighestQualification: String,
    Gender: {
            type:String,
           enum: ["Male", "Female", "Other"],
        description: "can only be one of these values: Male, Female, Other"
      },
   
      Courses: {
        // dropdownfield: {
            type: String,
            enum: ['MERN', 'python', 'ML', 'java']
        // },
    },
    ContactNO: {
        type: Number,
        // maxLength: [10, "number should not be greater than 10 numbers"],
        // minLength: [10, "number should not be less than 10 numbers"],
       
        // require: [true]
        
    },
    AlternateNo: {
        type: Number,
        maxLength: [10, "number should not be greater than 10 numbers"],
        minLength: [10, "number should not be less than 10 numbers"],
        // require: [true]
    },
    ReferalCode: {
        type: String,
        maxLength: [15, "number should not be greater than 15 character"],
        minLength: [7, "number should not be less than 7 character"],
        
    
}



},
{timestamps:true}
);

module.exports = mongoose.model("AddStudent", AddStudentSchema);