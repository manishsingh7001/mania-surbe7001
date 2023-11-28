// UpdateQuiz.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const UpdateQuiz = () => {
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState('');
  const [updatedQuestions, setUpdatedQuestions] = useState([]);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await fetch(`http://localhost:5000/quizzes/${quizId}`);
        const data = await response.json();
        setQuiz(data);
        setUpdatedTitle(data.title);
        setUpdatedQuestions(data.questions);
      } catch (error) {
        console.error('Error fetching quiz:', error);
      }
    };

    fetchQuiz();
  }, [quizId]);

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:5000/quizzes/${quizId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: updatedTitle, questions: updatedQuestions }),
      });

      const data = await response.json();
      console.log(data);
      // Redirect to the view page or update the UI as needed
    } catch (error) {
      console.error('Error updating quiz:', error);
    }
  };

  const handleQuestionChange = (index, newQuestion) => {
    const updatedQuestionsCopy = [...updatedQuestions];
    updatedQuestionsCopy[index] = newQuestion;
    setUpdatedQuestions(updatedQuestionsCopy);
  };

  if (!quiz) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Update Quiz</h2>
      <label>New Title:</label>
      <input
        type="text"
        value={updatedTitle}
        onChange={(e) => setUpdatedTitle(e.target.value)}
      />

      <h3>Updated Questions:</h3>
      {updatedQuestions.map((question, index) => (
        <div key={index}>
          <label>Question {index + 1}:</label>
          <input
            type="text"
            value={question.questionText}
            onChange={(e) => handleQuestionChange(index, { ...question, questionText: e.target.value })}
          />

          <h4>Updated Options:</h4>
          {question.options.map((option, optionIndex) => (
            <div key={optionIndex}>
              <label>Option {optionIndex + 1}:</label>
              <input
                type="text"
                value={option}
                onChange={(e) =>
                  handleQuestionChange(index, {
                    ...question,
                    options: question.options.map((opt, i) =>
                      i === optionIndex ? e.target.value : opt
                    ),
                  })
                }
              />
            </div>
          ))}

          <label>Updated Correct Option:</label>
          <select
            value={question.correctOptionIndex}
            onChange={(e) =>
              handleQuestionChange(index, { ...question, correctOptionIndex: parseInt(e.target.value) })
            }
          >
            {question.options.map((_, i) => (
              <option key={i} value={i}>
                Option {i + 1}
              </option>
            ))}
          </select>
        </div>
      ))}

      <button onClick={handleUpdate}>Update Quiz</button>
    </div>
  );
};

export default UpdateQuiz;
