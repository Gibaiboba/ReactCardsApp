import cls from "./HomePage.module.css";
import { QuestionCard } from "../../components/QuestionCard/QuestionCard";
import { API_URL } from "../../constans";
import { useEffect, useState } from "react";

export const HomePage = () => {
  const [questions, setQuestions] = useState([]);

  const getQuestion = async () => {
    try {
      const response = await fetch(`${API_URL}/react`);
      const questions = await response.json();

      setQuestions(questions);

      console.log("questions", questions);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getQuestion();
  }, []);

  return (
    <>
      {questions.map((card, index) => {
        return <QuestionCard card={card} key={index} />;
      })}
    </>
  );
};
