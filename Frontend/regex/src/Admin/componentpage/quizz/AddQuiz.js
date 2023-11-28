
import React, { useState } from 'react';

const CreateQuizForm = () => {
  const [quizData, setQuizData] = useState({
    title: '',
    questions: [
      { questionText: '', options: ['', '', ''], correctOptionIndex: 0 },
    ],
  });

  const handleInputChange = (event, index) => {
    const { name, value } = event.target;
    const updatedQuestions = [...quizData.questions];
    updatedQuestions[index][name] = value;
    setQuizData({ ...quizData, questions: updatedQuestions });
  };

  const handleOptionChange = (event, index, optionIndex) => {
    const updatedQuestions = [...quizData.questions];
    updatedQuestions[index].options[optionIndex] = event.target.value;
    setQuizData({ ...quizData, questions: updatedQuestions });
  };

  const addQuestion = () => {
    setQuizData({
      ...quizData,
      questions: [
        ...quizData.questions,
        { questionText: '', options: ['', '', ''], correctOptionIndex: 0 },
      ],
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:5000/addquiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(quizData),
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error creating quiz:', error);
    }
  };

  return (
    <div className="quiz-form-container">
      <h2>Create Quiz</h2>
      <label>Title:</label>
      <input
        type="text"
        name="title"
        value={quizData.title}
        onChange={(e) => setQuizData({ ...quizData, title: e.target.value })}
      />

      <h3>Questions:</h3>
      {quizData.questions.map((question, index) => (
        <div key={index} className="question-container">
          <label>Question {index + 1}:</label>
          <input
            type="text"
            name="questionText"
            value={question.questionText}
            onChange={(e) => handleInputChange(e, index)}
          />

          <h4>Options:</h4>
          {question.options.map((option, optionIndex) => (
            <div key={optionIndex} className="option-container">
              <label>Option {optionIndex + 1}:</label>
              <input
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(e, index, optionIndex)}
              />
            </div>
          ))}

          <label>Correct Option:</label>
          <select
            value={question.correctOptionIndex}
            onChange={(e) =>
              handleInputChange(
                { target: { name: 'correctOptionIndex', value: e.target.value } },
                index
              )
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

      <button onClick={addQuestion}>Add Question</button>
      <button onClick={handleSubmit}>Submit Quiz</button>
    </div>
  );
};

export default CreateQuizForm;


