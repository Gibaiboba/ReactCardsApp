import cls from "./SearchInput.module.css";
import { useId } from "react";
import { SearchIcon } from "../icons.jsx";

export const SearchInput = ({ value, onChange }) => {
  const inputId = useId();

  return (
    <div className={cls.inputContainer}>
      <label htmlFor={inputId}>
        <SearchIcon className={cls.searchIcon} />
      </label>

      <input
        type="text"
        id={inputId}
        className={cls.input}
        value={value}
        placeholder="Search..."
        onChange={onChange}
      />
    </div>
  );
};
