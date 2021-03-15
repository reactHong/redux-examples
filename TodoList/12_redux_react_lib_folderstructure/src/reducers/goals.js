import { ADD_GOAL, DELETE_GOAL } from "../actions/goals";
import { RECEIVE_DATA } from "../actions/shared";

const goals = (state = [], action) => {
  switch(action.type) {
    case ADD_GOAL:
      return state.concat(action.goal);
    case DELETE_GOAL:
      return state.filter(goal => goal.id !== action.id);
    case RECEIVE_DATA:
      return action.todos;
    default:
      return state;
  }
}

export default goals;