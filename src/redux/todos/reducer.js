import {
  ADDED,
  ALLCOMPLETED,
  CLEARCOMPLETED,
  DELETED,
  LOADED,
  TOGGLED,
} from "./actionTypes";
import initialState from "./initialState";

const nextTodoId = (todos) => {
  const maxId = todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1);
  return maxId + 1;
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADED:
      return action.payload;

    case ADDED:
      const newTodo = {
        id: nextTodoId(state),
        title: action.payload,
        completed: false,
      };
      const addedTodos = [...state, newTodo];
      localStorage.setItem("todos", JSON.stringify(addedTodos));
      return addedTodos;

    case TOGGLED:
      const toggleTodos = state.map((todo) => {
        if (todo.id !== action.payload) {
          return todo;
        }

        const updatedTodo = {
          ...todo,
          completed: !todo.completed,
        };
        return updatedTodo;
      });
      localStorage.setItem("todos", JSON.stringify(toggleTodos));
      return toggleTodos;

    // case DELETED:
    //   return state.filter((todo) => todo.id !== action.payload);
    case DELETED:
      const newState = state.filter((todo) => todo.id !== action.payload);
      localStorage.setItem("todos", JSON.stringify(newState));
      return newState;

    case ALLCOMPLETED:
      const updatedTodos = state.map((todo) => {
        return {
          ...todo,
          completed: true,
        };
      });
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;

    case CLEARCOMPLETED:
      const clearTodos = state.filter((todo) => !todo.completed);
      localStorage.setItem("todos", JSON.stringify(clearTodos));
      return clearTodos;

    default:
      return state;
  }
};

export default reducer;
