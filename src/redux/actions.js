
import axios from 'axios';
import { API_URL, PER_PAGE_DEFAULT } from '../constants';

export function showError(text) {
  return {
    type: 'SHOW_ERROR',
    text
  };
}

// pokemons

export function pokemonsLoading(isLoading) {
  return {
    type: 'POKEMONS_LOADING',
    isLoading
  };
}

export function fetchPokemonsSuccess(data) {
  return {
    type: 'POKEMONS_SUCCESS',
    data
  };
}

export function fetchPokemonsInfoSuccess(data) {
  return {
    type: 'POKEMONS_INFO_SUCCESS',
    data
  };
}

export function fetchPokemons(limit = PER_PAGE_DEFAULT, offset = 0) {
  return (dispatch) => {
    const params = {
      limit, 
      offset,
    };
    dispatch(pokemonsLoading(true));
    axios.get(`${API_URL}/pokemon`, { params })
      .then((resp) => {
        dispatch(pokemonsLoading(false));
        dispatch(fetchPokemonsSuccess(resp.data));
        dispatch(fetchPokemonsData(resp.data.results));
      })
      .catch(() => dispatch(showError('Can\'t load pokemons list')))
  }
}

export function fetchPokemonsData(arr) {
  return (dispatch) => {
    dispatch(pokemonsLoading(true));
    const requests = arr.map(item => axios.get(item.url));
    axios.all(requests)
      .then(axios.spread((...data) => {
        dispatch(pokemonsLoading(false));
        return data;
      }))
      .catch(() => dispatch(showError('Can\'t load pokemons data')))
      .then((data) => dispatch(fetchPokemonsInfoSuccess(data)))
  };
}

// paginator

export function changeLimit(limit) {
  return {
    type: 'CHANGE_LIMIT',
    limit
  };
}

export function changePage(page) {
  return {
    type: 'CHANGE_PAGE',
    page
  };
}

// search filter

export function changeNamedFilter(data) {
  return {
    type: 'CHANGE_NAMED_FILTER',
    data
  }
}

// tags filter

export function changeTagsFilter(data) {
  return {
    type: 'CHANGE_TAGS_FILTER',
    data
  }
}
export function cleanTagsFilter(data) {
  return {
    type: 'CLEAN_TAGS_FILTER',
    data
  }
}