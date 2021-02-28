import React from 'react';
import { connect } from 'react-redux';
import Goals from './Goals';
import Todos from './Todos';
import { handleInitialData } from '../actions/shared';

class App extends React.Component {

  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    if (this.props.loading) {
      return <h1>Loading...</h1>
    }

    return (
      <div className="App">
        <Todos />
        <Goals />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.loading,
});

export default connect(mapStateToProps)(App);
