import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';

const renderAbilities = (abilities) => {
  return abilities.map((item) => (
    <span 
      className="ability badge badge-success" 
      key={shortid.generate()}
    >
      {item.ability.name}
    </span>
  ));
}

const renderStats = (stats) => {
  return stats.map((item) => (
    <span 
      className="stat" 
      key={shortid.generate()}
    >
      <span className="name">{item.stat.name}</span>&nbsp;
      <span className="value">{item.base_stat}</span>
    </span>
  ));
}

const PokemonRow = (props) => {
  return (
    <tr key={props.data.url}>
      <td><img src={props.data.image} alt={props.data.name} /></td>
      <td>
        <h5>{props.data.name}</h5>
        <div className="abilities">
          {props.data.abilities && renderAbilities(props.data.abilities)}
        </div>
        <div className="stats">
          {props.data.stats && renderStats(props.data.stats)}
        </div>
      </td>
    </tr>
  );
};

PokemonRow.propTypes = {
  data: PropTypes.object.isRequired,
};

export default PokemonRow;