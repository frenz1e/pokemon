import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PER_PAGE, PER_PAGE_DEFAULT } from '../constants';
import { fetchPokemons, changeLimit, changePage } from '../redux/actions';

class PerPage extends Component {
  constructor(props) {
    super(props);
    this.selected = PER_PAGE_DEFAULT;
    this.onSelectChange = this.onSelectChange.bind(this);
  }

  onSelectChange(event) {
    const limit = event.target.value * 1;
    const { page, count } = this.props.pagination;
    const offset = (page - 1) * limit;
    this.props.dispatch(changeLimit(limit));
    if (count / limit < page) {
      const pages = Math.floor(count / limit);
      this.props.dispatch(fetchPokemons(limit, (pages) * limit));
      this.props.dispatch(changePage(pages + 1));
    } else {
      this.props.dispatch(fetchPokemons(limit, offset));
    }
  }

  render() {
    return (
      <select 
        disabled={this.props.loading}
        onChange={this.onSelectChange} 
        className="form-control per-page"
      >
        {
          [...new Set(PER_PAGE.concat(PER_PAGE_DEFAULT))]
          .sort((a, b) => a - b).map((option) => <option key={option}>{option}</option>)
        }
      </select>
    );
  }
}

export default connect((state) => ({
  loading: state.loaders.pokemonsLoading,
  pagination: state.pagination,
}))(PerPage);