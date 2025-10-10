import cls from "./QuestionPage.module.css";
import { Button } from "../../components/Button";
import { useNavigate, useParams } from "react-router-dom";
import { Badge } from "../../components/Badge";
import { useState, useId, useEffect } from "react";
import { useFetch } from "../../hooks/useFetch";
import { API_URL } from "../../constans";
import { Loader, SmallLoader } from "../../components/Loader";

const card = {
  id: "2",
  question: "Что такое JSX?",
  answer: "JSX — это синтаксическое расширение JavaScript для React.",
  description:
    "JSX позволяет писать HTML-подобный код в JavaScript, который затем транспилируется в вызовы `React.createElement`. Он облегчает создание и визуальное представление структуры компонентов.",
  resources: ["https://react.dev/learn/writing-markup-with-jsx"],
  level: 2,
  completed: false,
  editDate: "03.02.2025, 20:25",
};

export const QuestionPage = () => {
  const checkboxId = useId();
  const navigate = useNavigate();
  const { id } = useParams();
  const [card, setCard] = useState(null);
  const [isChecked, setIsChecked] = useState(true);

  const levelVariant = () => {
    card.level === 1 ? "primary" : card.level === 2 ? "warning" : "alert";
  };
  const completedVariant = () => {
    card.completed ? "success" : "primary";
  };

  const [fetchCard, isCardLoading] = useFetch(async () => {
    const response = await fetch(`${API_URL}/react/${id}`);
    const data = await response.json();
    setCard(data);
  });

  const [updateCard, isCardUpdating] = useFetch(async (isChecked) => {
    const response = await fetch(`${API_URL}/react/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ completed: isChecked }),
    });
    const data = await response.json();
    setCard(data);
  });

  useEffect(() => {
    fetchCard();
  }, []);
  useEffect(() => {
    card !== null && setIsChecked(card.completed);
  }, [card]);

  const onCheckeboxChangeHandler = () => {
    setIsChecked(!isChecked);
    updateCard(!isChecked);
  };

  return (
    <>
      {isCardLoading && <Loader />}
      {card !== null && (
        <div className={cls.container}>
          <div className={cls.cardLabels}>
            <Badge variant={levelVariant()}>Level: {card.level} </Badge>
            <Badge variant={completedVariant()}>
              {card.completed ? "Completed" : "Not completed"}
            </Badge>

            {card?.editDate && (
              <p className={cls.editDate}>Edited: {card.editDate}</p>
            )}
          </div>

          <h5 className={cls.title}>{card.question}</h5>

          <p className={cls.cardDescription}>{card.description}</p>

          <div className={cls.cardAnswers}>
            <label>Short answer:</label>
            <p className={cls.cardAnswer}>{card.answer}</p>
          </div>
          <ul className={cls.cardLinks}>
            Resources:
            {card.resources.map((link, index) => {
              return (
                <li key={index}>
                  <a href={link.trim()} target="_blank" rel="noreferrer">
                    {link.trim()}
                  </a>
                </li>
              );
            })}
          </ul>

          <label htmlFor={checkboxId} className={cls.cardCheckbox}>
            <input
              type="checkbox"
              id={checkboxId}
              className={cls.checkbox}
              checked={isChecked}
              onChange={onCheckeboxChangeHandler}
              disabled={isCardUpdating}
            />
            <span>mark question as completed</span>
            {isCardUpdating && <SmallLoader />}
          </label>

          <Button
            onClick={() => navigate(`/editquestion/${card.id}`)}
            isDisabled={isCardUpdating}
          >
            Edit Question
          </Button>
          <Button onClick={() => navigate("/")} isDisabled={isCardUpdating}>
            Back
          </Button>
        </div>
      )}
    </>
  );
};
