import { useCallback, useRef, useState } from "react";
import Questions from "../questions.js";
import quizComplete from "../assets/quiz-complete.png";
import QuestionTimer from "./QuestionTimer.jsx";
import Answer from "./Answers.jsx";
export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);
  const [answerState, setAnswerState] = useState("");
  const currentQuestion =
    answerState === "" ? userAnswers.length : userAnswers.length - 1;
  

  const handleSelectedAnswer = useCallback(
    function handleSelectedAnswer(selectedAnswer) {
      setAnswerState("answered");

      setUserAnswers((prevAnswers) => {
        return [...prevAnswers, selectedAnswer];
      });

      setTimeout(() => {
        if (selectedAnswer === Questions[currentQuestion].answers[0]) {
          setAnswerState("correct");
        } else {
          setAnswerState("wrong");
        }

        setTimeout(() => {
          setAnswerState("");
        }, 2000);
      }, 1000);
    },
    [currentQuestion]
  );

  const handleSkipAnswer = useCallback(
    () => handleSelectedAnswer(null),
    [handleSelectedAnswer]
  );

  /*
      - handle end of the question
      - if questions ended preview summary screen
    */
  const quizEnded = currentQuestion === Questions.length;
  if (quizEnded) {
    return (
      <div id="summary">
        <img src={quizComplete} alt="Quiz summary picture" />
        <h2>Quiz is complete</h2>
      </div>
    );
  }

  let timer = 10000;
  if(answerState === "answered"){
    timer = 2000;
  }

  if (answerState === "correct" || answerState === "wrong"){
    timer = 2000;
  }

  return (
    <div id="quiz">
      <div id="question">
        <QuestionTimer
          key={currentQuestion}
          timeout={timer}
          onTimeout={answerState === "" ? handleSkipAnswer : null}
        />
        <h1>{Questions[currentQuestion].text}</h1>
        <main> <Answer
                key={currentQuestion}
                answers={Questions[currentQuestion].answers}
                selectedAnswer={userAnswers[userAnswers.length - 1]}
                answerState={answerState}
                onSelect={handleSelectedAnswer}
                
                /> </main>
      </div>
    </div>
  );
}
