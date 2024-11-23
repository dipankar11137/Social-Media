import React, { useState } from 'react';
import { toast } from 'react-toastify';
import useUser from '../../hooks/useUser';
import './Quiz.css';

const Quiz = () => {
  const [showResults, setShowResults] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const { user } = useUser();
  const currentDateAndTime = new Date();
  const currentDate = currentDateAndTime.toDateString();
  const currentTime = currentDateAndTime.toLocaleTimeString();
  const questions = [
    {
      text: 'What is the capital of America?',
      options: [
        { id: 0, text: 'New York City', isCorrect: false },
        { id: 1, text: 'Boston', isCorrect: false },
        { id: 2, text: 'Santa Fe', isCorrect: false },
        { id: 3, text: 'Washington DC', isCorrect: true },
      ],
    },
    {
      text: 'What year was the Constitution of America written?',
      options: [
        { id: 0, text: '1787', isCorrect: true },
        { id: 1, text: '1776', isCorrect: false },
        { id: 2, text: '1774', isCorrect: false },
        { id: 3, text: '1826', isCorrect: false },
      ],
    },
    {
      text: 'Who was the second president of the US?',
      options: [
        { id: 0, text: 'John Adams', isCorrect: true },
        { id: 1, text: 'Paul Revere', isCorrect: false },
        { id: 2, text: 'Thomas Jefferson', isCorrect: false },
        { id: 3, text: 'Benjamin Franklin', isCorrect: false },
      ],
    },
    {
      text: 'What is the largest state in the US?',
      options: [
        { id: 0, text: 'California', isCorrect: false },
        { id: 1, text: 'Alaska', isCorrect: true },
        { id: 2, text: 'Texas', isCorrect: false },
        { id: 3, text: 'Montana', isCorrect: false },
      ],
    },
    {
      text: 'Which of the following countries DO NOT border the US?',
      options: [
        { id: 0, text: 'Canada', isCorrect: false },
        { id: 1, text: 'Russia', isCorrect: true },
        { id: 2, text: 'Cuba', isCorrect: false },
        { id: 3, text: 'Mexico', isCorrect: false },
      ],
    },
  ];

  const optionClicked = isCorrect => {
    if (isCorrect) {
      setScore(score + 1);
    }
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleNext = () => {
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handlePageClick = index => {
    setCurrentQuestion(index);
  };

  const restartGame = () => {
    setScore(0);
    setCurrentQuestion(0);
    setShowResults(false);
  };

  const handleSubmit = () => {
    const updateData = {
      correctAnswer: score,
      questions: questions.length,
      percent: parseInt((score / questions.length) * 100),
      name: user?.name,
      email: user?.email,
      img: user?.img,
      date: currentDate,
      time: currentTime,
      quiz: 'Quiz 1',
    };
    // console.log(user)

    fetch(`http://localhost:5000/solve`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    })
      .then(res => res.json())
      .then(data => {
        toast.success('Submit Successfully');
        restartGame();
      });
  };

  return (
    <div className="quiz pt-5">
      <div className="mb-3 text-3xl">
        <h1>Quiz With Us</h1>
        {/* <h2>Score: {score}</h2> */}
      </div>

      <div className="question-card">
        <div className=" flex justify-between text-start mb-5">
          <div>
            <h2>
              Question: {currentQuestion + 1} out of {questions.length}
            </h2>
            <h3 className="question-text">{questions[currentQuestion].text}</h3>
          </div>
          <div className="pagination mt-4">
            {questions.map((_, index) => (
              <button
                key={index}
                onClick={() => handlePageClick(index)}
                className={`page-number ${
                  index === currentQuestion ? 'active' : 'hover:underline'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>

        <ul className="ui1">
          {questions[currentQuestion].options.map(option => (
            <li
              className="li1 cursor-pointer hover:bg-secondary hover:text-black font-bold"
              key={option.id}
              onClick={() => optionClicked(option.isCorrect)}
            >
              {option.text}
            </li>
          ))}
        </ul>

        <div className="flex justify-between mt-4">
          <button
            onClick={handlePrevious}
            className="btn btn-accent"
            disabled={currentQuestion === 0}
          >
            Previous
          </button>

          {currentQuestion + 1 === questions.length ? (
            <button
              onClick={handleSubmit}
              className="ml-8 btn btn-secondary font-bold"
            >
              Submit
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="btn btn-primary"
              // disabled={currentQuestion + 1 === questions.length}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
