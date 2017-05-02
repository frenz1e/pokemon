import React, { Component } from 'react';
import { connect } from 'react-redux';
import PokemonsTable from './PokemonsTable';
import Spinner from './Spinner';
import Filter from './Filter';
import Tags from './Tags';
import PerPage from './PerPage';
import Pager from './Pager';
import { fetchPokemons } from '../redux/actions';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(fetchPokemons());
  }
  
  render() {
    return (
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col">
            <h2>
              Pokedex
              <Spinner />
            </h2>
            <Filter />
            <div className="row">
              <div className="col-md-11">
                <Tags />
              </div>
              <div className="col-md-1">
                <PerPage />
              </div>
            </div>
            <Pager />
            <PokemonsTable />
            
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(App);
