import cls from "./QuestionCard.module.css";
import { Button } from "../Button/Button";

export const QuestionCard = () => {
  return (
    <div className={cls.card}>
      <div className={cls.cardLabels}>
        <div>Level 1</div>
        <div>Not completed</div>
      </div>

      <h5 className={cls.title}>What is JSX?</h5>

      <div className={cls.cardAnswers}>
        <label>Short answer:</label>
        <p className={cls.cardAnswer}>
          Lorem ipsum away doloy fuchen arsenskl gestuculate dkahalisi whaii
          sunna cdirecti
        </p>
      </div>
      <Button onClick={() => {}}>View</Button>
    </div>
  );
};
