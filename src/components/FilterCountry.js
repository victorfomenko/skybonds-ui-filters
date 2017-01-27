import React, { Component } from 'react';
import FilterComponent from '../components/FilterComponent';
import FilterListItem from '../components/FilterListItem';
import FilterListItemAll from '../components/FilterListItemAll';
import style from '../style/filter.sass';



class FilterCountry extends FilterComponent {
  constructor(props) {
    super(props);
    this.initValues(props.country);
    this.initFilterName('Country');
  }

  componentWillReceiveProps(props){
    this.initValues(props.country);
  }

  _map(value){
    const lables = {
      'RUS': 'Russia',
      'USA': 'United Sates',
      'GBR': 'Great Britain'
    };
    if(lables[value] != null) { return lables[value] }
    return value
  }

  content() {
    this.sortCollection('country');
    var {country} = this.props;
    var countriesList = (country.values || []).map((item, index) => {
      var name = this._map(item.name);
      return <FilterListItem
        key={index}
        id={`country-${item.name}-${index}`}
        name={name}
        selected={item.selected}
        disabled={item.disabled}
        tag={item.tag}
        onChange={ (value) => {
          country.values[index].selected = value;
          this.props.onChange(country)
        }} />
    });

    return (
      <ul className={style.filter__dropdownMenu}>
        <FilterListItemAll
          key="All countries"
          name="All countries"
          values={country.values || []}
          onChange={ (values) => {
            country.values = values;
            this.props.onChange(country);
          }} />
        {countriesList}
      </ul>
    )
  }
}

FilterCountry.propTypes = {
  country: React.PropTypes.object.isRequired,
  sortStrategy: React.PropTypes.func
};

export default FilterCountry