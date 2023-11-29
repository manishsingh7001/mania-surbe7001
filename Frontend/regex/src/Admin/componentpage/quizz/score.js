// src/QuizTaker.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const QuizTaker = () => {
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await fetch(`http://localhost:5000/quizzes/${quizId}`);
        const data = await response.json();
        setQuiz(data);
        // Initialize answers array with default values
        setAnswers(new Array(data.questions.length).fill(-1));
      } catch (error) {
        console.error('Error fetching quiz:', error);
      }
    };

    fetchQuiz();
  }, [quizId]);

  const handleOptionChange = (questionIndex, optionIndex) => {
    const updatedAnswers = [...answers];
    updatedAnswers[questionIndex] = optionIndex;
    setAnswers(updatedAnswers);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:5000/submitquiz/${quizId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answers }),
      });
      const data = await response.json();
      setScore(data.score);
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting quiz:', error);
    }
  };

  if (!quiz) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{quiz.title}</h2>
      <form>
        {quiz.questions.map((question, questionIndex) => (
          <div key={questionIndex}>
            <p>{question.questionText}</p>
            {question.options.map((option, optionIndex) => (
              <label key={optionIndex}>
                <input
                  type="radio"
                  name={`question-${questionIndex}`}
                  value={optionIndex}
                  checked={answers[questionIndex] === optionIndex}
                  onChange={() => handleOptionChange(questionIndex, optionIndex)}
                />
                {option}
              </label>
            ))}
          </div>
        ))}
        <button type="button" onClick={handleSubmit} disabled={submitted}>
          Submit Quiz
        </button>
      </form>

      {submitted && score !== null && (
        <div>
          <h3>Your Score:</h3>
          <p>{score}/{quiz.questions.length}</p>
        </div>
      )}
    </div>
  );
};

export default QuizTaker;
