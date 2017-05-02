import { PER_PAGE_DEFAULT } from '../constants.js';
// import unionBy from 'lodash/unionBy';

export function pokemons(state = [], action) {
  switch (action.type) {
    case 'POKEMONS_INFO_SUCCESS':
      const pokemons = action.data.map((pokemon) => ({
        id: pokemon.data.id,
        name: pokemon.data.name,
        stats: pokemon.data.stats, 
        abilities: pokemon.data.abilities,
        types: pokemon.data.types,
        image: pokemon.data.sprites.front_default,
      }));
      // return unionBy(state, pokemons, 'id');
      return pokemons;
    default:
      return state;
  }
}

export function loaders(state = { pokemonsLoading: false }, action) {
  switch (action.type) {
    case 'POKEMONS_LOADING':
      return {...state, pokemonsLoading: action.isLoading};
    default:
      return state;
  }

}

export function nameFilter(state = '', action) {
  switch (action.type) {
    case 'CHANGE_NAMED_FILTER':
      return action.data;
    default:
      return state;
  }
}

export function tagsFilter(state = [], action) {
  switch (action.type) {
    case 'CHANGE_TAGS_FILTER':
      const tag = action.data;
      let tagsFilter = [...state];
      if (tagsFilter.indexOf(tag) === -1) {
        tagsFilter.push(tag);
      } else {
        tagsFilter.splice(tagsFilter.indexOf(tag), 1);
      }
      return tagsFilter;
    case 'CLEAN_TAGS_FILTER':
      return [...state].filter((tag) => action.data.indexOf(tag) !== -1);
    default:
      return state;
  }
}

const pagerInitialState = {
  limit: PER_PAGE_DEFAULT, 
  page: 1,
  count: 0,
  previous: null,
  next: null,
}

export function pagination(state = pagerInitialState, action) {
  switch (action.type) {
    case 'CHANGE_LIMIT':
      return {...state, limit: action.limit};
    case 'CHANGE_PAGE':
      return {...state, page: action.page};
    case 'POKEMONS_SUCCESS':
      const {
        count,
        previous,
        next,
      } = action.data;
      return {...state, count, previous, next};
    default:
      return state;
  }
}

