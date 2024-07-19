import QuizCategory from "../component/quizCategory";
import React from "react";
import { Link } from "react-router-dom";

type QuizAPI = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
};

export default function Start() {
  const [category, setCategory] = React.useState("General Knowledge");
  const [quizData, setQuizData] = React.useState("");
  function handleCategory(e: React.ChangeEvent<HTMLSelectElement>) {
    setCategory(e.target.value);
  }
  const [errorMessage,setErrorMessage]=React.useState("");

  const fetchData = async () => {
    let apiUrl = "";
    if (category === "General Knowledge") {
      apiUrl =
        "https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple";
    } else if (category === "Books") {
      apiUrl =
        "https://opentdb.com/api.php?amount=5&category=10&difficulty=easy&type=multiple";
    } else if (category === "Cartoon and Animations") {
      apiUrl =
        "https://opentdb.com/api.php?amount=5&category=32&difficulty=easy&type=multiple";
    } else if (category === "Science and Nature") {
      apiUrl =
        "https://opentdb.com/api.php?amount=5&category=17&difficulty=easy&type=multiple";
    }
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const shuffledData = data.results.map((quiz: QuizAPI) => {
          const options = [...quiz.incorrect_answers, quiz.correct_answer];
          const shuffledOptions = options.sort(() => Math.random() - 0.5);
          return { ...quiz, shuffledOptions };
        });
        setQuizData(JSON.stringify(shuffledData));
      } catch (error) {
        console.error("Error fetching quiz data:", error);
        setErrorMessage(`Error fetching quiz data:, ${error}, Please try again`);
      }
  };
  React.useEffect(() => {
    setQuizData("");
    fetchData()
  }, [category]);
  return (
    <div className="startPage">
      <img src="../public/blue.png" alt="blue illustration" className="blue" />
      <div className="startContent">
        <h1 className="title text-center">Quizzical</h1>
        <p className="description text-center">Some description if needed</p>
        {quizData ? 
        <Link to={`/Quiz?data=${encodeURIComponent(quizData)}`}>
          <button className="start text-center">Start quiz</button>
        </Link> :
        <p className="error">{errorMessage}</p>}
        <QuizCategory handleSelect={handleCategory} />
      </div>
      <img
        src="../public/yellow.png"
        alt="yellow illustration"
        className="yellow"
      />
    </div>
  );
}
