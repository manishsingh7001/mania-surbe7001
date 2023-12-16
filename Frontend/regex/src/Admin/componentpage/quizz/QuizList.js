// QuizList.js
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { navigate } from "react-router-dom";

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await fetch("http://localhost:5000/quizzes");
        const data = await response.json();
        setQuizzes(data);
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      }
    };

    fetchQuizzes();
  }, []);
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      console.log("Token not found. Navigating to login.");
      navigate("/admin/login");
    }
  });

  return (
    <div>
      <h2>Quiz List</h2>
      <ul>
        {quizzes.map((quiz) => (
          <li key={quiz._id}>
            <Link to={`/quizzes/${quiz._id}`}>{quiz.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuizList;
