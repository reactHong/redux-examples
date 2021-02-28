import API from "goals-todos-api";

export const ADD_TODO = "ADD_TODO";
export const DELETE_TODO = "DELETE_TODO";
export const TOGGLE_TODO = "TOGGLE_TODO";

const addTodo = (todo) => ({
  type: ADD_TODO,
  todo,
});

const deleteTodo = (id) => ({
  type: DELETE_TODO,
  id,
});

const toggleTodo = (id) => ({
  type: TOGGLE_TODO,
  id,
});

export const handleAddTodo = (name, callback) => (dispatch) => {
  return API.saveTodo(name)
    .then(todo => {
      dispatch(addTodo(todo));
      callback();
    })
    .catch(() => {
      alert("[Error] Failed to add a todo. Please try again!!");
    });
};

export const handleDeleteTodo = (todo) => (dispatch) => {

  dispatch(deleteTodo(todo.id));

  return API.deleteTodo(todo.id)
    .then(todos => {
      //TODO: Compare ids for sure
    })
    .catch(() => {
      alert("[Error] Failed to delete a todo. Please try again!!");
      dispatch(addTodo(todo));
    });
};

export const handleToggleTodo = (id) => (dispatch) => {

  dispatch(toggleTodo(id));

  return API.saveTodoToggle(id)
  .then(todos => {
    //TODO: Compare ids for sure
  })
  .catch(() => {
    alert("[Error] Failed to toggle a todo. Please try again!!");
    dispatch(toggleTodo(id));
  });
};
