import React, { Component } from 'react';
import FilterComponent from '../components/FilterComponent';
import FilterListItem from '../components/FilterListItem';
import FilterListItemAll from '../components/FilterListItemAll';


class FilterType extends FilterComponent {
  constructor(props) {
    super(props);
    this.props.type.values = this.props.type.values || [];
    this._type = this.props.type;
    this.initValues(this.props.type);
    this.initFilterName('Type');
  }

  _sortCollection(){
    if (this.props.type.sortStrategy == null) {return null}
    this._type.values.sort(this.props.type.sortStrategy)
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
    this._sortCollection();
    var typesList = this._type.values.map((item, index) => {
      var name = this._map(item.name);
      return <FilterListItem
        key={index}
        name={name}
        id={`country-${item.name}-${index}`}
        selected={item.selected}
        className={`filter__dropdown-item_${item.name}`}
        disabled={item.disabled}
        tag={item.tag}
        onChange={ (value) => {
          this.props.type.values[index].selected = value;
          this.props.onChange(this.props.type)
        }} />
    });
    return (
      <ul className="filter__dropdown-menu">
        <FilterListItemAll
          key="All types"
          name="All types"
          values={this.props.type.values || []}
          onChange={ (values) => {
            this.props.type.values = values;
            this.props.onChange(this.props.type);
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