import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PokemonRow from './PokemonRow';
import { filterByName, filterByTags} from '../utils';

class PokemonsTable extends Component {

  render() {
    let { pokemons, nameFilter, tagsFilter } = this.props;  
    pokemons = filterByName(pokemons, nameFilter);
    pokemons = filterByTags(pokemons, tagsFilter);

    return (
      <div>
        <table className="table pokemons-table">
          <tbody>
            {pokemons.map((pokemon) => 
              <PokemonRow 
                data={pokemon} 
                key={pokemon.id} 
              />
            )}
          </tbody>
        </table>
      </div>
    )
  };
} 

PokemonsTable.propTypes = {
  pokemons: PropTypes.array.isRequired,
  tagsFilter: PropTypes.array.isRequired,
  nameFilter: PropTypes.string.isRequired,
}

export default connect((state) => ({
  pokemons: state.pokemons,
  tagsFilter: state.tagsFilter,
  nameFilter: state.nameFilter,
}))(PokemonsTable);