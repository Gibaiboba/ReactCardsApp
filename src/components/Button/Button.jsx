import cls from "./Button.module.css";

// const styleColor = {
//   color: "yellow",
//   backgroundColor: "#ccc",
// };

const isPrimary = true;

export const Button = ({ onClick, children }) => {
  return (
    <button
      className={`${cls.btn} ${isPrimary ? cls.primary : ""}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
