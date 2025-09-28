const items = [
  {
    task: "Learn ReactJS",
    icon: "0_0",
    isCompleted: false,
  },
  {
    task: "Make sure",
    icon: "$k",
    isCompleted: true,
  },
  {
    task: "Learn English",
    icon: ":)",
    isCompleted: false,
  },
];

export const List = () => {
  return (
    <div>
      {items.map((item, index) => {
        return (
          <section key={index} className={item.isCompleted ? "completed" : ""}>
            <span>{item.icon}</span>
            <h4>{item.task}</h4>
          </section>
        );
      })}
    </div>
  );
};
