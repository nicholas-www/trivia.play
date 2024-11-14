import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/home/Home";
import Quiz from "./pages/quiz/Quiz";
import AppContext from "./context/AppContext";

export default function App() {
  const NUMBER_OF_QUESTIONS = 20;
  const SECONDS_PER_QUESTIONS = 15;

  const [timeLeft, setTimeLeft] = useState(SECONDS_PER_QUESTIONS);
  const [selected, setSelected] = useState("");
  const [category, setCategory] = useState("");
  const [score, setScore] = useState(0);
  const [lock, setLock] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [reset, setReset] = useState(true);
  const [timerRunning, setTimerRunning] = useState(false);
  const [randomChoices, setRandomChoices] = useState([])
  const [randomNumbers, setRandomNumbers] = useState([])

  return (
    <div>
      <AppContext.Provider
        value={{
          selected,
          setSelected,
          score,
          setScore,
          answered,
          setAnswered,
          timerRunning,
          setTimerRunning,
          SECONDS_PER_QUESTIONS,
          NUMBER_OF_QUESTIONS,
          timeLeft,
          setTimeLeft,
          category, setCategory, randomChoices, setRandomChoices, randomNumbers, setRandomNumbers
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/quiz"
              element={
                <AppContext.Provider
                  value={{
                    selected,
                    setSelected,
                    score,
                    setScore,
                    lock,
                    setLock,
                    answered,
                    setAnswered,
                    reset,
                    setReset,
                    timerRunning,
                    setTimerRunning,
                    SECONDS_PER_QUESTIONS,
                    NUMBER_OF_QUESTIONS,
                    timeLeft,
                    setTimeLeft,
                    category, randomNumbers, setRandomNumbers, randomChoices, setRandomChoices
                  }}
                >
                  <Quiz />
                </AppContext.Provider>
              }
            />
            <Route path="/result" />
          </Routes>
        </BrowserRouter>
      </AppContext.Provider>
    </div>
  );
}
