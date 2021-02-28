import API from "goals-todos-api";

export const ADD_GOAL = "ADD_GOAL";
export const DELETE_GOAL = "DELETE_GOAL";

const addGoal = (goal) => ({
  type: ADD_GOAL,
  goal,
});

const deleteGoal = (id) => ({
  type: DELETE_GOAL,
  id,
});

export const handleAddGoal = (name, callback) => (dispatch) => {
  return API.saveGoal(name)
    .then(goal => {
      dispatch(addGoal(goal));
      callback();
    })
    .catch(goal => {
      alert("[Error] Failed to add a goal. Please try again!!");
    });
};

export const handleDeleteGoal = (goal) => (dispatch) => {

  dispatch(deleteGoal(goal.id));

  return API.deleteGoal(goal.id)
    .then(goals => {
      //TODO: Compare ids for sure
    })
    .catch(() => {
      alert("[Error] Failed to delete a goal. Please try again!!");
      dispatch(addGoal(goal));
    });
};
