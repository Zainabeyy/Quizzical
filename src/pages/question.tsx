import React from "react";
import { nanoid } from "nanoid";
import Option from "../component/Option";
import { Link } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import {decode} from 'html-entities';

// Custom Types ----------

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

function useQuery() {
  return new URLSearchParams(useLocation().search);
}


// Main Function ---------

export default function Questions() {

  const query=useQuery();
  const dataString = query.get('data');
  const [quizData,setQuizData]=React.useState<ShuffledData[]>([])
  React.useEffect(()=>{
  if(dataString){
    setQuizData(JSON.parse(decodeURIComponent(dataString)))
  }
  },[])
  
  const [selectedOption, setSelectedOption] = React.useState<SelectedOption>({
    question1: "",
    question2: "",
    question3: "",
    question4: "",
    question5: "",
  });
  let selectedOptionString=JSON.stringify(selectedOption)

  // event handling functions ------

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const {name,value}=event.target
    setSelectedOption((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  }

  function isOptionFilled(){
    if(selectedOption.question1 && selectedOption.question2 && selectedOption.question3 && selectedOption.question4 && selectedOption.question5){
      return true
    }
    else
    return false
  }

  // displaying html elements on browser ---------

  const quizElements = quizData.map((quiz, index) => {
    const OptionElement = quiz.shuffledOptions.map(
      (option: string, ind: number) => {
        return (
          <Option
            key={nanoid()}
            qIndex={index}
            oIndex={ind}
            value={option}
            selectedOption={selectedOption}
            correctAnswer={quiz.correct_answer}
            handleChange={handleChange}
          />
        );
      }
    );
    return (
      <div key={nanoid()}>
        <p className="question">{decode(quiz.question)}</p>
        <div className="options">{OptionElement}</div>
        <hr />
      </div>
    );
  });
  return (
    <div className="QuestionPage">
      <img
        src="../public/blue.png"
        alt="blue illustration"
        className="blue qustionBlueImg"
      />
      <div className="questionContent">
        <form>
          {quizElements}
          <div className="buttonScore">
            {isOptionFilled() ? 
            <Link to={`/Answer?data=${encodeURIComponent(dataString || "")}&selectedOptions=${encodeURIComponent(selectedOptionString)}`}>
            <button >Check Answer</button>
            </Link>
            :
            <p className="button" onSubmit={(e)=>e.preventDefault()}>Answer all questions</p>
            }
          </div>
        </form>
      </div>
      <img
        src="../public/yellow.png"
        alt="yellow illustration"
        className="yellow qustionYellowImg"
      />
    </div>
  );
}
