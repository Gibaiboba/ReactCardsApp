import cls from "./QuestionCard.module.css";
import { Button } from "../Button/Button";
import { useNavigate } from "react-router-dom";

export const QuestionCard = ({ card }) => {
  const navigate = useNavigate();

  return (
    <div className={cls.card}>
      <div className={cls.cardLabels}>
        <div>Level: {card.level} </div>
        <div>{card.comleted ? "Completed" : "Not completed"}</div>
      </div>

      <h5 className={cls.title}>{card.question}</h5>

      <div className={cls.cardAnswers}>
        <label>Short answer:</label>
        <p className={cls.cardAnswer}>{card.answer}</p>
      </div>
      <Button onClick={() => navigate(`/question/${card.id}`)}>View</Button>
    </div>
  );
};
