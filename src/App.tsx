import React, { useEffect, useState } from "react";
import "./App.css";

function shuffle(a: Array<any>): Array<any> {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

let defaultQuestions = [
  { question: "ทำบุญ?", points: 1 },
  { question: "พาคนแก่ข้ามถนน?", points: 1 },
  { question: "ช่วยงานชุมชน?", points: 1 },
  { question: "ช่วยสัตว์บาดเจ็บ?", points: 1 },
  { question: "บริจาคเลือด?", points: 1 },
  { question: "บริจาคเงินการกุศล?", points: 1 },
  { question: "ตัดเล็บสั้น?", points: 0.5 },
  { question: "ปลูกป่า สร้างฝาย?", points: 1 },
  { question: "เชื่อฟังพ่อแม่?", points: 1 },
  { question: "ประหยัดน้ำไฟ?", points: 1 },
  { question: "ชนะโอลิมปิก?", points: 0.5 },
  { question: "พับผ้าห่ม?", points: 1 },
  { question: "ช่วยเพื่อนตบมุก?", points: 1 },
];

// defaultQuestions.push({ question: "รักสถาบัน?", points: 112 });

function App() {
  const [questions, setQuestions] = useState(defaultQuestions.slice(0, 5));
  const [points, setPoints] = useState(0);
  const [questionIdx, setQuestionIdx] = useState(0);
  const [result, setResult] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    chooseQuestions();
  }, []);

  function chooseQuestions() {
    const chosenQuestions = shuffle(defaultQuestions).slice(0, 5);
    chosenQuestions.push({ question: "รักสถาบัน?", points: 112 });

    setQuestions(chosenQuestions);
  }

  function answer(yes: boolean) {
    if (yes) {
      setPoints((points) => points + questions[questionIdx].points);
    } else {
      setPoints((points) => points - questions[questionIdx].points);
    }

    if (questionIdx + 1 == questions.length) {
      if (yes) {
        setPoints(() => questions[questionIdx].points);
        setResult(true);
      } else {
        setPoints(() => -questions[questionIdx].points);
        setResult(false);
      }
    } else {
      setQuestionIdx((questionIdx) => questionIdx + 1);
    }
  }

  function reset() {
    setPoints(0);
    setQuestionIdx(0);
    chooseQuestions();
    setResult(undefined);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>(คนดี)</h1>
        {result !== undefined && (
          <h1>
            คุณเป็น...
            <span
              className={
                result ? "stripe-flag-kondee" : "stripe-flag-konmaidee"
              }
              style={{ fontSize: "300%" }}
            >
              {result ? "คนดี" : "คนไม่ดี"}
            </span>
          </h1>
        )}
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

        {result !== undefined && (
          <button type="button" onClick={() => reset()}>
            ลองใหม่
          </button>
        )}

        <a
          href="https://twitter.com/iannnnn/status/1423889025228689412?s=20"
          target="_blank"
          style={{ color: "white" }}
        >
          ที่มา
        </a>
      </header>
    </div>
  );
}

export default App;
