import React from "react";
import { connect } from "react-redux";
import { 
  handleAddTodo, 
  handleDeleteTodo, 
  handleToggleTodo 
} from "../actions/todos";
import List from "./List";

class Todos extends React.Component {
  addTodo = () => {
    const name = this.input.value;
    
    this.props.dispatch(handleAddTodo(name, () => {
      this.input.value = '';
    }));
  }

  deleteTodo = (todo) => {
    this.props.dispatch(handleDeleteTodo(todo));
  }

  toggleTodo = (id) => {
    this.props.dispatch(handleToggleTodo(id));
  }

  render() {
    return(
      <div>
        <h3>Todos List</h3>
        <input
          type="text"
          placeholder="Add a Todo"
          ref={(input) => this.input = input}
        />
        <button onClick={this.addTodo}>Add a Todo</button>
        <List 
          items={this.props.todos} 
          remove={this.deleteTodo}
          toggle={this.toggleTodo}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  todos: state.todos,
});

export default connect(mapStateToProps)(Todos);
