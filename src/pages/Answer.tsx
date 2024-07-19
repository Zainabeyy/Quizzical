import { useLocation } from "react-router-dom";
import React from "react";
import { Link } from "react-router-dom";
import { nanoid } from "nanoid";
import {decode} from 'html-entities';

type QuizAPI = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
};
type SelectedOption = {
  [key: string]: string;
};
type ShuffledData = QuizAPI & { shuffledOptions: string[] };
type Answer = QuizAPI & SelectedOption;

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Answer() {
  const query = useQuery();
  const dataString = query.get("data");
  const selectedOptionString = query.get("selectedOptions");
  let score=0;
  const [selectedOption, setSelectedOption] = React.useState<SelectedOption>();
  const [quizData, setQuizData] = React.useState<ShuffledData[]>([]);
  React.useEffect(() => {
    if (dataString) {
      setQuizData(JSON.parse(decodeURIComponent(dataString)));
    }
    if (selectedOptionString) {
      setSelectedOption(JSON.parse(selectedOptionString));
    }
  }, []);
  console.log(selectedOption);
  const quizElements = quizData.map((quiz, index) => {
    let question = `question${index+1}`;
    let selectedAnswer: string = "";
    if (selectedOption) {
      selectedAnswer = selectedOption[question];
    }
    if(selectedAnswer===quiz.correct_answer){
      score+=1;
    }
    const OptionElement = quiz.shuffledOptions.map((option) => {
      let answerClass = "notChecked";
      if (option === quiz.correct_answer) {
        answerClass = "correct";
      } else if (option == selectedAnswer && option !==quiz.correct_answer) {
        answerClass = "wrong";
      }
      return (
        <p className={`option answerOption ${answerClass}`} key={nanoid()}>
          {decode(option)}
        </p>
      );
    });
    return (
      <div key={nanoid()}>
        <p className="question">{decode(quiz.question)}</p>
        <div className="options">{OptionElement}</div>
        <hr />
      </div>
    );
  });
  return (
    <div className="AnswerPage">
      <img
        src="../public/blue.png"
        alt="blue illustration"
        className="blue qustionBlueImg"
      />
      <div className="questionContent">
        <div>
          {quizElements}
          <div className="buttonScore">
            <p className="score">You scored {score}/5 correct answers</p>
            <Link to="/">
              <button>Play again</button>
            </Link>
          </div>
        </div>
      </div>
      <img
        src="../public/yellow.png"
        alt="yellow illustration"
        className="yellow qustionYellowImg"
      />
    </div>
  );
}
