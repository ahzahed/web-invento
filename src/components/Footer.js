import { useDispatch, useSelector } from "react-redux";
import { statusChanged } from "../redux/filters/actions";

const numberOfTodos = (no_of_todos) => {
  switch (no_of_todos) {
    case 0:
      return "No task";
    case 1:
      return "1 task";
    default:
      return `${no_of_todos} tasks`;
  }
};

export default function Footer() {
  const todos = useSelector((state) => state.todos);
  const filters = useSelector((state) => state.filters);

  const dispatch = useDispatch();
  const todosRemaining = todos.filter((todo) => !todo.completed).length;
  const { status } = filters;

  const handleStatusChange = (status) => {
    dispatch(statusChanged(status));
  };

  return (
    <div className="mt-4 flex justify-between text-xs text-gray-500">
      <p>{numberOfTodos(todosRemaining)} left</p>
      <ul className="flex space-x-1 items-center text-xs">
        <li
          className={`cursor-pointer ${status === "All" && "font-bold"}`}
          onClick={() => handleStatusChange("All")}
        >
          All
        </li>
        <li>|</li>
        <li
          className={`cursor-pointer ${status === "Incomplete" && "font-bold"}`}
          onClick={() => handleStatusChange("Incomplete")}
        >
          Incomplete
        </li>
        <li>|</li>
        <li
          className={`cursor-pointer ${status === "Complete" && "font-bold"}`}
          onClick={() => handleStatusChange("Complete")}
        >
          Complete
        </li>
      </ul>
    </div>
  );
}
