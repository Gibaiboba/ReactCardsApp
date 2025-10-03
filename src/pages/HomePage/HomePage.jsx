import cls from "./HomePage.module.css";
import { API_URL } from "../../constans";
import { useEffect, useState } from "react";
import { QuestionCardList } from "../../components/QuestionCardList";

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
      <QuestionCardList cards={questions} />
    </>
  );
};
