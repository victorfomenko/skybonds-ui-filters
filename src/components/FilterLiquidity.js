import React, { Component } from 'react';
import FilterComponent from '../components/FilterComponent';
import FilterListItem from '../components/FilterListItem';
import FilterListItemAll from '../components/FilterListItemAll';


class FilterLiquidity extends FilterComponent {
  constructor(props) {
    super(props);
    this.props.liquidity.values = this.props.liquidity.values || [];
    this._liquidity = this.props.liquidity;
    this.initValues(this.props.liquidity.values);
    this.initFilterName('Liquidity');
  }

  _sortCollection(){
    if (this.props.liquidity.sortStrategy == null) {return null}
    this._liquidity.values.sort(this.props.liquidity.sortStrategy)
  }

  _map(value){
    const lables = {
      'very high': 'Very high liquidity',
      'high': 'High liquidity',
      'average': 'Average liquidity',
      'low': 'Low liquidity',
      'non-liquid': 'Non-liquid',
    };
    if(lables[value] != null) { return lables[value] }
    return value
  }

  content() {
    this._sortCollection();
    var liquiditiesList = this._liquidity.values.map((item, index) => {
      var name = this._map(item.name);
      return <FilterListItem
        key={index}
        name={name}
        id={`country-${item.name}-${index}`}
        selected={item.selected}
        disabled={item.disabled}
        onChange={ (value) => {
          this.props.liquidity.values[index].selected = value;
          this.props.onChange(this.props.liquidity)
        }} />
    });
    return (
      <ul className="filter__dropdown-menu">
        <FilterListItemAll
          key="Any liquidity"
          name="Any liquidity"
          values={this.props.liquidity.values || []}
          onChange={ (values) => {
            this.props.liquidity.values = values;
            this.props.onChange(this.props.liquidity);
          }} />
        {liquiditiesList}
      </ul>
    )
  }
}

FilterLiquidity.propTypes = {
  liquidity: React.PropTypes.object.isRequired,
  sortStrategy: React.PropTypes.func
};

export default FilterLiquidity