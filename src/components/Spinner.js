import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Spinner = (props) => props.loading ? (
  <div className="spinner">
    <div className="bounce1"></div>
    <div className="bounce2"></div>
    <div className="bounce3"></div>
  </div>
) : null;

Spinner.propsTypes = {
  loading: PropTypes.bool.isRequired,
}

export default connect((state) => ({
  loading: state.loaders.pokemonsLoading,
}))(Spinner);