import cls from "./HomePage.module.css";
import { API_URL } from "../../constans";
import { useEffect, useMemo, useState } from "react";
import { QuestionCardList } from "../../components/QuestionCardList";
import { Loader } from "../../components/Loader";
import { useFetch } from "../../hooks/useFetch";
import { SearchInput } from "../../components/SearchInput";

export const HomePage = () => {
  const [questions, setQuestions] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [sortSelectValue, setSortSelectValue] = useState("");

  const [getQuestion, isLoading, error] = useFetch(async (url) => {
    const response = await fetch(`${API_URL}/${url}`);
    const questions = await response.json();
    setQuestions(questions);
    return questions;
  });

  const cards = useMemo(() => {
    return questions.filter((data) =>
      data.question.toLowerCase().includes(searchValue.trim().toLowerCase())
    );
  }, [questions, searchValue]);

  useEffect(() => {
    getQuestion(`react?${sortSelectValue}`);
  }, [sortSelectValue]);

  const onSearchChangeHandler = (e) => {
    setSearchValue(e.target.value);
  };

  const onSortSelectChangeHandler = (e) => {
    setSortSelectValue(e.target.value);
  };

  return (
    <>
      <div className={cls.controlsContainer}>
        <SearchInput value={searchValue} onChange={onSearchChangeHandler} />

        <select
          value={sortSelectValue}
          onChange={onSortSelectChangeHandler}
          className={cls.select}
        >
          <option value="">Sort by</option>
          <hr />
          <option value="_sort=level">Level ASC</option>
          <option value="_sort=-level">Level Desc</option>
          <option value="_sort=completed">Completed ASC</option>
          <option value="_sort=-completed">Completed Desc</option>
        </select>
      </div>

      {isLoading && <Loader />}
      {error && <p>{error}</p>}
      {cards.length === 0 && <p className={cls.noCardsInfo}>No cards...</p>}
      <QuestionCardList cards={cards} />
    </>
  );
};
