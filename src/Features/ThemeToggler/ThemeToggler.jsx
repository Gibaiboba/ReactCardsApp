import cls from "./ThemeToggler.module.css";
import { useTheme } from "../../hooks/useTheme";
import { THEME_STORAGE } from "../../constans";

export const ThemeToggler = () => {
  const { theme, setTheme } = useTheme();

  const onChangeHandler = (e) => {
    const updatedTheme = e.target.checked === false ? "light" : "dark";

    setTheme(updatedTheme);

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
