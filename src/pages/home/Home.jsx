import React, { useState, useRef, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  fa1,
  fa2,
  fa3,
  faAtom,
  faBrain,
  faGlobe,
  faHistory,
  faHourglass2,
  faLanguage,
} from "@fortawesome/free-solid-svg-icons";
import AppContext from "../../context/AppContext";

const Home = () => {
  const { category, setCategory } = useContext(AppContext);
  const [customMenuOpen, setCustomMenuOpen] = useState(false);
  const navigate = useNavigate();
  let scores = [0];

  if (localStorage.getItem("data")) {
    let objStr = localStorage.getItem("data");
    let obj = JSON.parse(objStr);
    scores = obj["scores"];
  }

  function selectCategory(type) {
    if (category === type) {
      setCategory("");
    } else {
      setCategory(type);
    }
  }

  function startQuiz() {
    if (category) {
      navigate("/quiz");
    }
  }

  return (
    <div className="container">
      <h1 className="logo">
        trivia<span>.play</span>
      </h1>
      <div className="stats">
        <h3 className="score high-score">
          High Score: <span>{Math.max(...scores)}</span>
        </h3>
        <h3 className="score previous-score">
          Recent Score: {scores[scores.length - 1]}
        </h3>
      </div>
      <hr />

      <h2 style={{ textAlign: "center", marginTop: "1rem" }}>
        Select an option
      </h2>

      <div className="categories">
        <div
          className={`category ${category === "math" ? "active" : ""}`}
          onClick={() => {
            selectCategory("math");
          }}
        >
          <h2>Math</h2>
          <div className="icon">
            <FontAwesomeIcon icon={fa1} />
            <FontAwesomeIcon icon={fa2} />
            <FontAwesomeIcon icon={fa3} />
          </div>
        </div>

        <div
          className={`category ${category === "science" ? "active" : ""}`}
          onClick={() => {
            selectCategory("science");
          }}
        >
          <h2>Science</h2>
          <div className="icon">
            <FontAwesomeIcon icon={faAtom} />
          </div>
        </div>

        <div
          className={`category ${category === "geography" ? "active" : ""}`}
          onClick={() => {
            selectCategory("geography");
          }}
        >
          <h2>Geography</h2>
          <div className="icon">
            <FontAwesomeIcon icon={faGlobe} />
          </div>
        </div>

        <div
          className={`category ${category === "language" ? "active" : ""}`}
          onClick={() => {
            selectCategory("language");
          }}
        >
          <h2>Language</h2>
          <div className="icon">
            <FontAwesomeIcon icon={faLanguage} />
          </div>
        </div>

        <div
          className={`category ${category === "gk" ? "active" : ""}`}
          onClick={() => {
            selectCategory("gk");
          }}
        >
          <h2>GK</h2>
          <div className="icon">
            <FontAwesomeIcon icon={faBrain} />
          </div>
        </div>

        <div
          className={`category ${category === "history" ? "active" : ""}`}
          onClick={() => {
            selectCategory("history");
          }}
        >
          <h2>History</h2>
          <div className="icon">
            <FontAwesomeIcon icon={faHourglass2} />
          </div>
        </div>
      </div>

      <button className="btn btn-primary play" onClick={startQuiz}>
        play
      </button>
    </div>
  );
};

export default Home;
