import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { changeNamedFilter } from '../redux/actions';

class Filter extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
    }
    this.onNameFilterChange = this.onNameFilterChange.bind(this);
  }

  onNameFilterChange(event) {
    const value = event.target.value;
    this.setState({
      value,
    });
    this.props.dispatch(changeNamedFilter(value));
  } 

  render() {
    return (
      <input 
        onChange={this.onNameFilterChange}
        disabled={!this.props.pokemons.length}
        className="form-control form-control-lg"
        placeholder="filter by name..."
      />
    );
  }
};

Filter.propTypes = {
  pokemons: PropTypes.array.isRequired,
};

export default connect((state) => ({
  pokemons: state.pokemons,
}))(Filter);