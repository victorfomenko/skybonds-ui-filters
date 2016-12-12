import React, { Component } from 'react';
import FilterComponent from '../components/FilterComponent';
import FilterListItem from '../components/FilterListItem';
import FilterListItemAll from '../components/FilterListItemAll';



class FilterCountry extends FilterComponent {
  constructor(props) {
    super(props);
    this.props.country.values = this.props.country.values || [];
    this._country = this.props.country;
    this.initValues(this.props.country.values);
    this.initFilterName('Country');
  }

  _sortCollection(){
    if (this.props.country.sortStrategy == null) {return null}
    this._country.values.sort(this.props.country.sortStrategy)
  }


  content() {
    this._sortCollection();
    var countriesList = this._country.values.map((item, index) => {
      return <FilterListItem
        key={index}
        id={`country-${item.name}-${index}`}
        name={item.name}
        selected={item.selected}
        disabled={item.disabled}
        onChange={ (value) => {
          this.props.country.values[index].selected = value;
          this.props.onChange(this.props.country)
        }} />
    });

    return (
      <ul className="filter__dropdown-menu">
        <FilterListItemAll
          key="All countries"
          name="All countries"
          values={this.props.country.values || []}
          onChange={ (values) => {
            this.props.country.values = values;
            this.props.onChange(this.props.country);
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