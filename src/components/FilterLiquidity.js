import React, { Component } from 'react';
import FilterComponent from '../components/FilterComponent';
import FilterListItem from '../components/FilterListItem';
import FilterListItemAll from '../components/FilterListItemAll';


class FilterLiquidity extends FilterComponent {
  constructor(props) {
    super(props);
    this.initValues(props.liquidity);
    this.initFilterName('Liquidity');
  }


  componentWillReceiveProps(props){
    this.initValues(props.liquidity);
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
    this.sortCollection('liquidity');
    var {liquidity} = this.props;
    var liquiditiesList = (liquidity.values || []).map((item, index) => {
      var name = this._map(item.name);
      return <FilterListItem
        key={index}
        name={name}
        id={`country-${item.name}-${index}`}
        selected={item.selected}
        disabled={item.disabled}
        tag={item.tag}
        onChange={ (value) => {
          liquidity.values[index].selected = value;
          this.props.onChange(liquidity)
        }} />
    });
    return (
      <ul className="filter__dropdown-menu">
        <FilterListItemAll
          key="All liquidities"
          name="All liquidities"
          values={liquidity.values || []}
          onChange={ (values) => {
            liquidity.values = values;
            this.props.onChange(liquidity);
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