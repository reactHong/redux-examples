import { RECEIVE_DATA } from "../actions/shared";
import { ADD_TODO, DELETE_TODO, TOGGLE_TODO } from "../actions/todos";

const todos = (state = [], action) => {
  switch(action.type) {
    case ADD_TODO:
      return state.concat(action.todo);
    case DELETE_TODO:
      return state.filter(todo => todo.id !== action.id);
    case TOGGLE_TODO:
      return state.map(todo => todo.id !== action.id ? todo :
        Object.assign({}, todo, {complete: !todo.complete}));
    case RECEIVE_DATA:
      return action.todos;
    default:
      return state;
  }
}

export default todos;