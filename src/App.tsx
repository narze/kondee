import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

const questions = [
  { question: "ทำบุญ?", points: 2 },
  { question: "พาคนแก่ข้ามถนน?", points: 1 },
  { question: "รักสถาบัน?", points: 112 },
];

function App() {
  const [points, setPoints] = useState(0);
  const [questionIdx, setQuestionIdx] = useState(0);
  const [result, setResult] = useState<boolean | undefined>(undefined);

  function answer(yes: boolean) {
    if (yes) {
      setPoints((points) => points + questions[questionIdx].points);
    } else {
      setPoints((points) => points - questions[questionIdx].points);
    }

    if (questionIdx + 1 == questions.length) {
      if (yes) {
        setResult(true);
      } else {
        setResult(false);
      }
    } else {
      setQuestionIdx((questionIdx) => questionIdx + 1);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>(คนดี)</h1>
        {result !== undefined && result ? "คนดี" : "คนไม่ดี"}
        {result === undefined && (
          <>
            <p>{questions[questionIdx].question}</p>
            <p>
              <button type="button" onClick={() => answer(true)}>
                Yes
              </button>{" "}
              <button type="button" onClick={() => answer(false)}>
                No
              </button>
            </p>
          </>
        )}

        <p>คะแนน : {points}</p>
      </header>
    </div>
  );
}

export default App;
