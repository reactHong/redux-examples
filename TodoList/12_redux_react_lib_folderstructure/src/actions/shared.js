import API from "goals-todos-api";

export const RECEIVE_DATA = "RECEIVE_DATA";

const receiveData = (todos, goals) => ({
  type: RECEIVE_DATA,
  todos,
  goals,
});

export const handleInitialData = () => (dispatch) => {
  Promise.all([
    API.fetchTodos(),
    API.fetchGoals(),
  ]).then(result => {
    const [todos, goals] = result;
    dispatch(receiveData(todos, goals));
  }).catch(error => {
    console.log("[App.componentDidMount]", error);
  });
};
