import React from 'react'
import { useState,useEffect } from 'react'
import Quizz from './Quizz'

const AddQuiz = () => {

    const [quiz, setQuiz] = useState([{
        question: "",
        option1: "",
        option2: "",
        option3: "",
        option4: "",
        answer: ""
    
      }])
    
      const setdata = (e) => {
        console.log(e.target.value);
        const { name, value } = e.target;
        setQuiz((preval) => {
          return {
            ...preval,
            [name]: value
          }
        })
      }
    const Submit=async(e)=>{
      e.preventDefault()

const {question,option1,option2,option3,option4}= quiz
      const add1 = await fetch(`http://localhost:5000/addquiz`, {
        method: 'post',
        body: JSON.stringify({
          question: "",
          option1: "",
          option2: "",
          option3: "",
          option4: "",
          answer: ""
          
      }),
        headers: {
            'Content-Type': 'application/json',
        }
    });
                
                 const data1 = add1.json


    useEffect(() => {
      Submit()
  }, []);
       
    }
   
    
  return (
    <>
    <form>
      
      <div>
        <button type="button">Add Question</button>
      </div>


      <div>
        <label>Question 1</label>
        <input type="text" placeholder='Enter your question?' name='question' value={quiz.question} onChange={setdata} />
      </div>


      <div>
        <label>Option 1:</label>
        <input type="text" placeholder='Enter the option1' name='option1' value={quiz.option1} onChange={setdata} />
      </div>
      <div>
        <label>Option 2:</label>
        <input type="text" placeholder='Enter the option1' name='option2' value={quiz.option2} onChange={setdata} />
      </div>
      <div>
        <label>Option 3:</label>
        <input type="text" placeholder='Enter the option1' name='option3' value={quiz.option3} onChange={setdata} />
      </div>
      <div>
        <label>Option 4:</label>
        <input type="text" placeholder='Enter the option1' name='option4' value={quiz.option4} onChange={setdata} />
      </div>

      <div>
        <label>Correct answer</label>
        <input type="text" placeholder='Enter the  correct answer from above options' name='answer' value={quiz.answer} onChange={setdata} />
      </div>


      <button type='button' onClick={Submit}>Submit</button>
      </form>
      
    </>
  )
}

export default AddQuiz
