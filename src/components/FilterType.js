import React, { Component } from 'react';
import FilterComponent from '../components/FilterComponent';
import FilterListItem from '../components/FilterListItem';
import FilterListItemAll from '../components/FilterListItemAll';
import style from '../style/filter.sass';


class FilterType extends FilterComponent {
  constructor(props) {
    super(props);
    this.initValues(props.type);
    this.initFilterName('Types');
  }

  componentWillReceiveProps(props){
    this.initValues(props.type);
  }

  _map(value){
    const lables = {
      'convertible': 'Convertible',
      'floater': 'Floater',
      'regular': 'Regular',
      'subord': 'Subordinated'
    };
    if(lables[value] != null) { return lables[value] }
    return value
  }


  content() {
    this.sortCollection('type');
    var {type} = this.props;
    var typesList = (type.values || []).map((item, index) => {
      var name = this._map(item.name);
      return <FilterListItem
        key={index}
        name={name}
        id={`country-${item.name}-${index}`}
        selected={item.selected}
        className={style[`filter__dropdown-item_${item.name}`]}
        disabled={item.disabled}
        tag={item.tag}
        onChange={ (value) => {
          type.values[index].selected = value;
          this.props.onChange(type)
        }} />
    });
    return (
      <ul className={style.filter__dropdownMenu}>
        <FilterListItemAll
          key="All types"
          name="All types"
          values={type.values || []}
          onChange={ (values) => {
            type.values = values;
            this.props.onChange(type);
          }} />
        {typesList}
      </ul>
    )
  }
}

FilterType.propTypes = {
  type: React.PropTypes.object.isRequired
};

export default FilterType