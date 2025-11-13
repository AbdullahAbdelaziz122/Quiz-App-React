import { useRef } from "react";

export default function Answers({answers, selectedAnswer, onSelect, answerState}) {
  const shuffeledAnswers = useRef();
  // shuffle answers
  if (!shuffeledAnswers.current) {
    shuffeledAnswers.current = [...answers];
    shuffeledAnswers.current.sort(() => Math.random() - 0.5);
  }
    return (
    <ul id="answers">
      {shuffeledAnswers.current.map((answer) => {
        const isSelected = selectedAnswer === answer;
        let cssClass = "";

        if (answerState === "answered" && isSelected) cssClass = "selected";
        if (
          (answerState === "correct" || answerState === "wrong") &&
          isSelected
        )
          cssClass = answerState;

        return (
          <li key={answer} className="answer">
            <button className={cssClass} onClick={() => onSelect(answer)}>
              {answer}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
