import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AddQuiz from './AddQuiz';


const Quizz = () => {

  const navigate = useNavigate();
  const [quiz, setQuiz] = useState([{
   question: "",
   option1: "" ,
   option2: "" ,
   option3: "" ,
   option4: "" ,
   answer: ""

  }])


  const handleFormChange = (index, event) => {
    const data2 = [...quiz];
    data2[index][event.target.name] = event.target.value;
    setQuiz(data2)

  }

  const addquestion = (e) => {
    e.preventDefault();
    // navigate("/addquiz")
    const newfield = {
      question: "",
      option1: "",
      option2: "",
      option3: "",
      option4: "",
      answer: ""
    }
    setQuiz([...quiz, newfield])
  }

  const submit = async () => {
    try {
      for (const questionObj of quiz) {
        const { question, option1, option2, option3, option4, answer } = questionObj;
  
        const add2 = await fetch("http://localhost:5000/addquiz", {
          method: 'POST',
          body: JSON.stringify({ question, option1, option2, option3, option4, answer }),
          headers: {
            'Content-Type': 'application/json'
          },
        });
  
        const data1 = await add2.json();
        console.log(data1);
  
        if (add2.status === 404 || !data1) {
          alert("error");
          console.log("error");
        } else {
          console.log("data added");
        }
      }
    } catch (error) {
      console.error("Error during submission:", error);
    }
  };
  

  // useEffect(() => {
  //   submit();
  // }, []);



  return (

    <>

      <form>
        <div>
          <button type="button" onClick={addquestion}>Add Question</button>
        </div>
        {quiz.map((input, index) => {
          return (
            <div key={index}>
              <div>
                <label>Question {index + 1}</label>
                <input type="text" placeholder='Enter your question?' name='question' value={input.question} onChange={event => handleFormChange(index, event)} />
              </div>


              <div>
                <label>Option 1:</label>
                <input type="text" placeholder='Enter the option1' name='option1' value={input.option1} onChange={event => handleFormChange(index, event)} />
              </div>
              <div>
                <label>Option 2:</label>
                <input type="text" placeholder='Enter the option1' name='option2' value={input.option2} onChange={event => handleFormChange(index, event)} />
              </div>
              <div>
                <label>Option 3:</label>
                <input type="text" placeholder='Enter the option1' name='option3' value={input.option3} onChange={event => handleFormChange(index, event)} />
              </div>
              <div>
                <label>Option 4:</label>
                <input type="text" placeholder='Enter the option1' name='option4' value={input.option4} onChange={event => handleFormChange(index, event)} />
              </div>

              <div>
                <label>Correct answer</label>
                <input type="text" placeholder='Enter the  correct answer from above options' name='answer' value={input.answer} onChange={event => handleFormChange(index, event)} />
              </div>



            </div>
          )

        })
        }
        <button type='button' onClick={submit}>Submit</button>


      </form>
    </>

  );
}


export default Quizz
