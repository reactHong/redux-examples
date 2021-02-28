import React from 'react';
import { connect } from 'react-redux';
import { 
  handleAddGoal, 
  handleDeleteGoal 
} from '../actions/goals';
import List from './List';

class Goals extends React.Component {
  addGoal = () => {
    const name = this.input.value;
    this.props.dispatch(handleAddGoal(name, () => {
      this.input.value = "";
    }));
  }

  deleteGoal = (goal) => {
    this.props.dispatch(handleDeleteGoal(goal));
  }

  render() {
    return(
      <div>
        <h3>Goals List</h3>
        <input
          type="text"
          placeholder="Add a Goal"
          ref={(input) => this.input = input}
        />
        <button onClick={this.addGoal}>Add a Goal</button>
        <List
          items={this.props.goals} 
          remove={this.deleteGoal}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  goals: state.goals,
});

export default connect(mapStateToProps)(Goals);
