import cls from "./QuestionCard.module.css";
import { Button } from "../Button/Button";
import { useNavigate } from "react-router-dom";
import { Badge } from "../Badge";

export const QuestionCard = ({ card }) => {
  const navigate = useNavigate();

  const levelVariant =
    card.level === 1 ? "primary" : card.level === 2 ? "warning" : "alert";
  const completedVariant = card.comleted ? "success" : "primary";

  return (
    <div className={cls.card}>
      <div className={cls.cardLabels}>
        <Badge variant={levelVariant}>Level: {card.level} </Badge>
        <Badge variant={completedVariant}>
          {card.comleted ? "Completed" : "Not completed"}
        </Badge>
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
