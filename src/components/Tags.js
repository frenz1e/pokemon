import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { changeTagsFilter, cleanTagsFilter } from '../redux/actions';
import isEqual from 'lodash/isEqual';

const Tag = ({ tag, active, onTagClick }) => (
  <button 
    className={`btn btn-${active ? 'primary' : 'secondary'}`}
    onClick={() => onTagClick(tag)}
  >{tag}</button>
);

Tag.propTypes = {
  tag: PropTypes.string.isRequired,
  onTagClick: PropTypes.func,
};

class Tags extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [],
    }
    this.onTagClick = this.onTagClick.bind(this);
  }

  onTagClick(tag) {
    this.props.dispatch(changeTagsFilter(tag));
  }

  componentWillReceiveProps(nextProps) {
    const tags = nextProps.pokemons.reduce((prev, next) => {
      next.types.forEach(({type}) => {
        prev.push(type.name);
      });
      return prev.filter((item, index, arr) => arr.indexOf(item) === index);
    }, []);

    if (!isEqual(tags.sort(), this.state.tags.sort())) {
      this.setState({
        tags,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const tagsDifference = this.props.tagsFilter.filter((tag) => this.state.tags.indexOf(tag) === -1);
    if (tagsDifference.length) {
      this.props.dispatch(cleanTagsFilter(this.state.tags));
    }
  }

  render() {
    const { tagsFilter } = this.props;

    return (
      <div className="tags">
        {this.state.tags.map((tag) => (
          <Tag 
            key={tag}
            tag={tag} 
            active={tagsFilter.length && tagsFilter.indexOf(tag) !== -1}
            onTagClick={this.onTagClick}
          />
        ))}
      </div>
    );
  }
}

Tags.propTypes = {
  pokemons: PropTypes.array.isRequired,
  tagsFilter: PropTypes.array.isRequired,
};

export default connect((state) => ({
  pokemons: state.pokemons,
  tagsFilter: state.tagsFilter
}))(Tags);