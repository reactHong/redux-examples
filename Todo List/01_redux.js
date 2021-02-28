function createStore(reducer) {

  let state;
  let listeners = [];

  const getState = () => ({ ...state });

  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener);
      // const index = listeners.indexOf(listener);
      // listeners.splice(index, 1);
    };
  };

  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach(listener => listener());
  };

  return {
    getState,
    subscribe,
    dispatch,
  };
}

const ADD_TODO = 'ADD_TODO';
const REMOVE_TODO = 'REMOVE_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';
const ADD_GOAL = 'ADD_GOAL';
const REMOVE_GOAL = 'REMOVE_GOAL';

function addTodoAction(todo) {
  return {
    type: ADD_TODO,
    todo,
  }
}

function removeTodoAction(id) {
  return {
    type: REMOVE_TODO,
    id,
  }
}

function toggleTodoAction(id) {
  return {
    type: TOGGLE_TODO,
    id,
  }
}

function addGoalAction(goal) {
  return {
    type: ADD_GOAL,
    goal,
  }
}

function removeGoalAction(id) {
  return {
    type: REMOVE_GOAL,
    id,
  }
}


function todos(state = [], action) {
  switch(action.type) {
    case ADD_TODO:
      return state.concat(action.todo);
    case REMOVE_TODO:
      return state.filter((todo) => todo.id !== action.id);
    case TOGGLE_TODO:
      return state.map((todo) => todo.id !== action.id ? todo :
        Object.assign({}, todo, { complete: !todo.complete }));
    default:
      return state;
  }
}

function goals(state = [], action) {
  switch(action.type) {
    case ADD_GOAL:
      return state.concat(action.goal);
    case REMOVE_GOAL:
      return state.filter((goal) => goal.id !== action.id);
    default:
      return state;
  }
}

function app(state = {}, action) {
  return {
    todos: todos(state.todos, action),
    goals: goals(state.goals, action),
  }
}

const store = createStore(app);

const unsubscribe1 = store.subscribe(() => {
  console.log("subscribed function 1 invoked! The new state is: ", store.getState());
});

const unsubscribe2 = store.subscribe(() => {
  console.log("The store changed. subscribed function 2 invoked!");
});

// unsubscribe1();
// unsubscribe2();

store.dispatch(addTodoAction({
  id: 0,
  name: "Learn Redux",
  complete: false,
}))
store.dispatch(addTodoAction({
  id: 1,
  name: "Wash the car",
  complete: false,
}))
store.dispatch(toggleTodoAction(1));
store.dispatch(removeTodoAction(0));

store.dispatch(addGoalAction({
  id: 0,
  name: "Master Redux",
}));
store.dispatch(addGoalAction({
  id: 1,
  name: "Master React",
}));
store.dispatch(removeGoalAction(0));




