import intersection from 'lodash/intersection'

export function filterByName(pokemons, nameFilter) {
  return nameFilter ? pokemons.filter((item) =>
      item.name.toLowerCase()
        .indexOf(nameFilter.toLowerCase()) !== -1
    ) : pokemons;
}

export function filterByTags(pokemons, tags) {
  function getPokemonTypes({ types }) {
    return types.reduce((prev, next) => prev.concat(next.type.name), []);
  }

  return tags.length ? pokemons.filter((item) =>
      intersection(getPokemonTypes(item), tags).length) : pokemons
}
