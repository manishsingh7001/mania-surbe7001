// ViewQuiz.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ViewQuiz = () => {
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await fetch(`http://localhost:5000/quizzes/${quizId}`);
        const data = await response.json();
        setQuiz(data);
      } catch (error) {
        console.error('Error fetching quiz:', error);
      }
    };

    fetchQuiz();
  }, [quizId]);

  if (!quiz) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{quiz.title}</h2>
      <ul>
        {quiz.questions.map((question, index) => (
          <li key={index}>
            <strong>Question {index + 1}:</strong> {question.questionText}
            <ul>
              {question.options.map((option, optionIndex) => (
                <li key={optionIndex}>{option}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewQuiz;
