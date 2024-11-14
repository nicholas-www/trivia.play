import React, { useState, useContext, useRef, useEffect } from "react";
import AppContext from "../../context/AppContext";
import "./Question.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Question = ({ question }) => {
  const {
    selected,
    setSelected,
    setScore,
    lock,
    setLock,
    setAnswered,
    answered,
    setTimerRunning,
    timeLeft,
  } = useContext(AppContext);

  const navigate = useNavigate()

  let A = useRef(null);
  let B = useRef(null);
  let C = useRef(null);
  let D = useRef(null);

  window.addEventListener('beforeunload', (e) => {
    e.preventDefault()
  })

  let choices = [
    <div
      key={1}
      className={`choice ${selected === "A" ? "active" : ""}`}
      onClick={(e) => {
        validateAnswer(e);
      }}
      id="A"
      ref={A}
    >
      {question.A}
      <span className="icons">
        <FontAwesomeIcon icon={faCheckCircle} className={"icon-correct"} />{" "}
        <FontAwesomeIcon icon={faXmarkCircle} className={"icon-wrong"} />
      </span>
    </div>,

    <div
      key={2}
      className={`choice ${selected === "B" ? "active" : ""}`}
      onClick={(e) => {
        validateAnswer(e);
      }}
      id="B"
      ref={B}
    >
      <span className="letter"></span>
      {question.B}
      <span className="icons">
        <FontAwesomeIcon icon={faCheckCircle} className={"icon-correct"} />{" "}
        <FontAwesomeIcon icon={faXmarkCircle} className={"icon-wrong"} />
      </span>
    </div>,

    <div
      key={3}
      className={`choice ${selected === "C" ? "active" : ""}`}
      onClick={(e) => {
        validateAnswer(e);
      }}
      id="C"
      ref={C}
    >
      <span className="letter"></span>
      {question.C}
      <span className="icons">
        <FontAwesomeIcon icon={faCheckCircle} className={"icon-correct"} />{" "}
        <FontAwesomeIcon icon={faXmarkCircle} className={"icon-wrong"} />
      </span>
    </div>,

    <div
      key={4}
      className={`choice ${selected === "D" ? "active" : ""}`}
      onClick={(e) => {
        validateAnswer(e);
      }}
      id="D"
      ref={D}
    >
      <span className="letter"></span>
      {question.D}
      <span className="icons">
        <FontAwesomeIcon icon={faCheckCircle} className={"icon-correct"} />{" "}
        <FontAwesomeIcon icon={faXmarkCircle} className={"icon-wrong"} />
      </span>
    </div>,
  ];

  useEffect(() => {
    if (!lock) {
      setTimerRunning(true);
    }
  });

  useEffect(() => {
    if (timeLeft === 0) {
      for (const ref of refs) {
        if (ref.current.id === question.answer) {
          ref.current.classList.add("correct");
          ref.current.classList.add("animate");
          return;
        }
      }
    }
  }, [timeLeft]);

  useEffect(() => {
    choices = choices.sort(() => Math.random() - 0.5); // Shuffle choices array, generated by Gemini AI
    if (answered) {
      setAnswered(false);
      for (const ref of refs) {
        ref.current.classList.remove("wrong");
        ref.current.classList.remove("correct");
        ref.current.classList.remove("animate");
      }
    } else {
      return;
    }
  }, [answered]);

  let refs = [A, B, C, D];

  function validateAnswer(e) {
    setSelected(true)
    setTimerRunning(false);
    if (lock) {
      return;
    } else {
      setLock(true);
      if (e.target.id === question.answer) {
        setScore((prev) => prev + 1);
        e.target.classList.add("correct");
      } else {
        e.target.classList.add("wrong");
        for (const ref of refs) {
          if (ref.current.id === question.answer) {
            ref.current.classList.add("correct");
            ref.current.classList.add("animate");
            return;
          }
        }
      }
    }
  }

  return (
    <div className="question">
      <h1>{question.question}</h1>
      <div className="choices">{choices}</div>
    </div>
  );
};

export default Question;
