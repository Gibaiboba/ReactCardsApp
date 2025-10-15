import cls from "./ThemeToggler.module.css";
import { useTheme } from "../../hooks/useTheme";
import { THEME_STORAGE } from "../../constans";

export const ThemeToggler = () => {
  const { theme, setTheme } = useTheme();

  const onChangeHandler = (e) => {
    const isChecked = e.target.checked === true;
    const updatedTheme = isChecked ? "dark" : "light";

    setTheme(updatedTheme);

    isChecked
      ? document.body.classList.add("darkLayout")
      : document.body.classList.remove("darkLayout");

    localStorage.setItem(THEME_STORAGE, updatedTheme);
  };

  return (
    <input
      className={cls.l}
      type="checkbox"
      onChange={onChangeHandler}
      checked={theme === "dark"}
    />
  );
};
