# Todo List App

## Overview
This is a simple `Todo List` application for learning how the redux is working under the hood. It is evolved step by step. These codes are written by React & Redux course of [Udacity React Nanodegree program](https://www.udacity.com/course/react-nanodegree--nd019). Some codes are different from the original one for studying and testing purpose.

## Content
- [01_redux.js](#01_redux)
- [02_redux_todo_without_lib.html](#02_redux_todo_without_lib)
- [03_redux_todo_with_lib.html](#03_redux_todo_with_lib)
- [04_redux_middleware.html](#04_redux_middleware)
- [05_redux_react.html](#05_redux_react)
- [06_redux_react_async.html](#06_redux_react_async)
- [07_redux_react_async_thunk.html](#07_redux_react_async_thunk)
- [08_redux_react_context.html](#08_redux_react_context)
- [09_redux_react_connect.html](#09_redux_react_connect)
- [10_redux_react_connect_practice.html](#10_redux_react_connect_practice)
- [11_redux_react_connect_with_lib.html](#11_redux_react_connect_with_lib)
- [12_redux_react_lib_folderstructure](#12_redux_react_lib_folderstructure)

## Detail of files

### 01_redux
- `creatStore` function is implemented.
- `redux.js` can be executed by `node.js`.

##### Store
```
function createStore(reducer) {

  let state;
  let listeners = [];

  const getState = () => ({ ...state });

  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener);
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
```
##### Reducer
```
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
```
##### Action
```
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
```

### 02_redux_todo_without_lib
- `creatStore` function is implemented.
- `Todo List` UI is implemented by html with DOM manipulation.

### 03_redux_todo_with_lib
- `redux` library is imported.
- `createStore` function is invoked by `redux` library.
```
<script src="https://cdnjs.cloudflare.com/ajax/libs/redux/3.7.2/redux.min.js"></script>
```
```
const store = Redux.createStore(Redux.combineReducers({
  todos,
  goals,
}));
```

### 04_redux_middleware
- Define middlewares with `Redux.applyMiddleware`.
```
const checker = (store) => (next) => (action) => {
  if (action.type === ADD_TODO && action.todo.name.toLowerCase().includes("bitcoin")) {
    return alert("Nop. That's a bad idea!");
  }

  if (action.type === ADD_GOAL && action.goal.name.toLowerCase().includes("bitcoin")) {
    return alert("Nop. That's a bad idea!");
  }

  return next(action);
};

const logger = (store) => (next) => (action) => {
  console.group(action.type);
    console.log("The action is", action);
  const result = next(action);
    console.log("The new state is", store.getState());
  console.groupEnd();
  return result;
}

const store = Redux.createStore(Redux.combineReducers({
  todos,
  goals,
}), Redux.applyMiddleware(checker, logger));
```

### 05_redux_react
- `react`, `react-dom`, and `babel` libraries are imported.
- Codes in `<script type="text/babel">` are executed by `babel`.
- `store` is passing to `App` component.

```
<script src="https://unpkg.com/react@16.3.0-alpha.1/umd/react.development.js"></script>
<script src="https://unpkg.com/react-dom@16.3.0-alpha.1/umd/react-dom.development.js"></script>
<script src="https://unpkg.com/babel-standalone@6.15.0/babel.min.js"></script>
```
```
<script type="text/babel">

    ...

    class App extends React.Component {

      componentDidMount() {
        this.unsubscribe = store.subscribe(() => {
          this.forceUpdate();
        });
      }

      componentWillUnmount() {
        this.unsubscribe();
      }

      render() {
        const { todos, goals } = this.props.store.getState();

        return(
          <div>
            <Todos todos={todos} store={this.props.store} />
            <Goals goals={goals} store={this.props.store} />
          </div>
        );
      }
    }

    ReactDOM.render(
      <App store={store} />,
      document.getElementById("app"));
  </script>
```

### 06_redux_react_async
- API functions from `goals-todos-api` library are called.
  - addItem / removeItem / toggleItem
```
<script src="https://tylermcginnis.com/goals-todos-api/index.js"></script>
```
```
class Todos extends React.Component {
  addItem = (e) => {
    e.preventDefault();

    const name = this.input.value;
    this.input.value = ''

    const tempId = generateId();

    this.props.store.dispatch(addTodoAction({
      id: tempId,
      name,
      complete: false,
    }));

    return API.saveTodo(name)
      .then(todo => {
        this.props.store.dispatch(updateTodoAction(tempId, todo.id));
      })
      .catch(todo => {
        this.props.store.dispatch(removeTodoAction(tempId));
        alert("[API.saveTodo] Error:", todo);
      });
  };

  removeItem = (todo) => {
    this.props.store.dispatch(removeTodoAction(todo.id));

    return API.deleteTodo(todo.id)
      .catch(error => {
        this.props.store.dispatch(addTodoAction(todo));
        alert("[API.deleteTodo] Error:", error);
      });
  };

  toggleItem = (id) => {
    this.props.store.dispatch(toggleTodoAction(id));

    return API.saveTodoToggle(id)
      .catch(error => {
        this.props.store.dispatch(toggleTodoAction(id));
        alert("[API.saveTodoToggle] Error:", error);
      });
  };

  ...

}
```
### 07_redux_react_async_thunk
- `redux-thunk` libary is imported.
- Functions can be dispatched by `redux-thunk`.
- Codes of handling asynchronous data are separated from react components.
```
<script src="https://unpkg.com/redux-thunk@2.2.0/dist/redux-thunk.min.js"></script>
```
```
class App extends React.Component {
  componentDidMount() {
    this.props.store.dispatch(handleInitialData());

    this.unsubscribe = store.subscribe(() => {
      this.forceUpdate();
    });
  }

  ...

}
```
```
function handleInitialData() {
  return (dispatch) => {
    return Promise.all([
      API.fetchTodos(),
      API.fetchGoals(),
    ]).then(result => {
      const [todos, goals] = result;
      dispatch(receiveDataAction(todos, goals));
    }).catch(error => {
      console.log("[App.componentDidMount] Error: ", error);
      alert(error);
    });
  };
}
```

### 08_redux_react_context
- Define `Connected` component for using `store` inside decendent components of `App` component with [Context in React](https://reactjs.org/docs/context.html).
- `App` component can access to `store` by `props`.

```
class ConnectedApp extends React.Component {
  render() {
    return(
      <Context.Consumer>
        {(store) => <App store={store} />}
      </Context.Consumer>
    );
  }
}

class App extends React.Component {
  componentDidMount() {
    this.props.store.dispatch(handleInitialData());

    this.unsubscribe = store.subscribe(() => {
      this.forceUpdate();
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const { loading } = this.props.store.getState();

    if (loading) {
      return <h2>Loading ...</h2>
    }

    return(
      <div>
        <ConnectedTodos />
        <ConnectedGoals />
      </div>
    );
  }
}

class Provider extends React.Component {
  render() {
    return(
      <Context.Provider value={this.props.store}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

const Context = React.createContext();

ReactDOM.render(
  <Provider store={store}>
    <ConnectedApp />
  </Provider>,
  document.getElementById("app"));
```

### 09_redux_react_connect
- Define `connect` function for creating `Connected` component easier.

```
function connect(mapStateToProps) {
  return (Component) => {

    class Receiver extends React.Component {
      componentDidMount() {
        this.unsubscribe = this.props.store.subscribe(() => {
          this.forceUpdate();
        });
      }

      componentWillUnmount() {
        this.unsubscribe();
      }

      render() {
        const state = this.props.store.getState();
        const props = mapStateToProps(state);

        return <Component {...props} dispatch={this.props.store.dispatch} />;
      }
    }

    class ConnectedComponent extends React.Component {
      render() {
        return(
          <Context.Consumer>
            {(store) => <Receiver store={store} />}
          </Context.Consumer>
        );
      }
    }

    return ConnectedComponent;
  }
}

const ConnectedApp = connect((state) => ({
  loading: state.loading,
}))(App);
```

### 10_redux_react_connect_practice
- Pratice to implement `connect` function.

### 11_redux_react_connect_with_lib
- `connect` function can be used by `react-redux` library.
```
<script src="https://unpkg.com/react-redux@5.0.6/dist/react-redux.min.js"></script>
```
```
const ConnectedApp = ReactRedux.connect((state) => ({
  loading: state.loading,
}))(App);
```

### 12_redux_react_lib_folderstructure
- This folder is `Todo List` app with the folder structure.
- This folder is created by `create-react-app`.
- [Go to this folder](https://github.com/reactHong/redux-examples/tree/main/Todo%20List/12_redux_react_lib_folderstructure)
