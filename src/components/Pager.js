import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Pagination from 'react-js-pagination';
import { changePage, fetchPokemons } from '../redux/actions';

class Pager extends Component {
  constructor(props) {
    super(props);
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  handlePageChange(page) {
    const { limit } = this.props.pagination;
    const offset = (page - 1) * limit;

    this.props.dispatch(changePage(page));
    this.props.dispatch(fetchPokemons(limit, offset));
  }

  render() {
    const {
      page,
      count,
      limit,
    } = this.props.pagination;
    return (
      <div className="pagination-wrap">
        <div className={(this.props.loading ? 'disabler' : '')}></div>
        <Pagination 
          activePage={page}
          itemsCountPerPage={limit}
          totalItemsCount={count}
          pageRangeDisplayed={10}
          onChange={this.handlePageChange}
        />
      </div>  
    );
  }
}

Pager.propTypes = {
  pagination: PropTypes.object.isRequired,
  loading: PropTypes.bool,
};

export default connect((state) => ({
  pagination: state.pagination,
  loading: state.loaders.pokemonsLoading,
}))(Pager);