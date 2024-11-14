import React, { useContext, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Quiz.css";
import math from "../../questions/math.json";
import science from "../../questions/science.json";
import gk from "../../questions/gk.json";
import language from "../../questions/language.json";
import history from "../../questions/history.json";
import geo from "../../questions/geography.json";
import Question from "../../components/question/Question";
import AppContext from "../../context/AppContext";
import Timer from "../../components/timer/Timer";

const Quiz = () => {
  const [randomNumbers, setRandomNumbers] = useState([]);
  const [randomQuestions, setRandomQuestions] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const navigate = useNavigate();

  const {
    setLock,
    setAnswered,
    score,
    setSelected,
    selected,
    setScore,
    setTimerRunning,
    timeLeft,
    setTimeLeft,
    NUMBER_OF_QUESTIONS,
    SECONDS_PER_QUESTIONS,
    category,
  } = useContext(AppContext);

  // This function sets the next question
  function nextQuestion() {
    setAnswered(true);
    if (currentIndex >= NUMBER_OF_QUESTIONS - 1) {
      console.log("Done");
      setTimerRunning(false);
      setShowResult(true);
    } else {
      if (currentIndex + 1 <= NUMBER_OF_QUESTIONS - 1) {
        setCurrentIndex((prev) => prev + 1);
        setTimeLeft(SECONDS_PER_QUESTIONS);
        setTimerRunning(true);
      }
      setLock(false);
      setSelected(false);
    }
  }

  function resetGame() {
    let percentageScore = Math.floor((score / NUMBER_OF_QUESTIONS) * 100);

    if (localStorage.getItem("data")) {
      let objStr = localStorage.getItem("data");
      let obj = JSON.parse(objStr);
      obj["scores"] = [...obj["scores"], percentageScore];
      objStr = JSON.stringify(obj);
      localStorage.setItem("data", objStr);
    } else {
      localStorage.setItem("data", `{"scores": [${percentageScore}]}`);
    }

    setTimeLeft(SECONDS_PER_QUESTIONS);
    setSelected("");
    setLock(false);
    setScore(0);

    navigate("/");
  }

  function generateRemarks() {
    let res = Math.floor((score / NUMBER_OF_QUESTIONS) * 100);

    if (res >= 80) {
      return "A";
    } else if (res >= 70) {
      return "B";
    } else if (res >= 60) {
      return "C";
    } else if (res >= 50) {
      return "D";
    } else if (res >= 35) {
      return "E";
    } else {
      return "F";
    }
  }

  function generateHighScoreStatus() {
    let percentageScore = Math.floor((score / NUMBER_OF_QUESTIONS) * 100);

    if (localStorage.getItem("data")) {
      let objStr = localStorage.getItem("data");
      let obj = JSON.parse(objStr);
      if (percentageScore > Math.max(...obj["scores"])) {
        return (
          <h2 className="new-high-score">
            New High Score: {percentageScore}%
          </h2>
        );
      } else {
        return (
          <h2 className="high-score">
            Highest Score: {Math.max(...obj["scores"])}
          </h2>
        );
      }
    }
  }

  // This is where random questions are generated
  useEffect(() => {
    let quizJSON = [];
    setTimeLeft(SECONDS_PER_QUESTIONS);

    // Change JSON for questions based on category selected
    switch (category) {
      case "math":
        quizJSON = math;
        break;
      case "science":
        quizJSON = science;
        break;
      case "gk":
        quizJSON = gk;
        break;
      case "language":
        quizJSON = language;
        break;
      case "history":
        quizJSON = history;
        break;
      case "geography":
        quizJSON = geo;
        break;
      default:
        quizJSON = gk;
        break;
    }

    let randomIndex = 0;
    if (randomNumbers.length !== NUMBER_OF_QUESTIONS) {
      randomIndex = Math.floor(Math.random() * quizJSON.length);
      while (randomNumbers.includes(randomIndex)) {
        randomIndex = Math.floor(Math.random() * quizJSON.length);
      }

      setRandomQuestions([
        ...randomQuestions,
        <Question question={quizJSON[randomIndex]} />,
      ]);
      setRandomNumbers([...randomNumbers, randomIndex]);
    }
  }, [randomNumbers]);

  return (
    <div className="container">
      <div className="quiz-header">
        <div className="questions-count">
          <span className="current">{currentIndex + 1}</span> /{" "}
          <span className="total">{randomQuestions.length}</span>
        </div>
        <div className="time">
          {showResult ? (
            ""
          ) : (
            <Timer
              onTimerEnd={nextQuestion}
              timeLeft={timeLeft}
              setTimeLeft={setTimeLeft}
              duration={SECONDS_PER_QUESTIONS}
            />
          )}
        </div>
      </div>

      <hr />

      {showResult ? (
        <div className="result">
          <div className="score">
            <p>{Math.floor((score / NUMBER_OF_QUESTIONS) * 100)}%</p>
            <div className="line"></div>
            <p className="remarks">{generateRemarks()}</p>
          </div>

          {generateHighScoreStatus()}
          <button className="btn btn-primary" onClick={resetGame}>
            menu
          </button>
        </div>
      ) : (
        <>
          <div className="question-container">
            {randomQuestions[currentIndex]}
          </div>

          <button className="btn btn-primary" onClick={nextQuestion}>
            {selected ? "next" : "skip"}
          </button>
        </>
      )}
    </div>
  );
};

export default Quiz;
