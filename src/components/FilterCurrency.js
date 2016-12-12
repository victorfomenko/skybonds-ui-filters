import React, { Component } from 'react';
import FilterComponent from '../components/FilterComponent';
import FilterListItem from '../components/FilterListItem';
import FilterListItemAll from '../components/FilterListItemAll';


class FilterCurrency extends FilterComponent {
  constructor(props) {
    super(props);
    this.props.currency.values = this.props.currency.values || [];
    this._currency = this.props.currency;
    this.initValues(this.props.currency.values);
    this.initFilterName('Currency');
  }


  _sortCollection(){
    if (this.props.currency.sortStrategy == null) {return null}
    this._currency.values.sort(this.props.currency.sortStrategy)
  }


  content() {
    this._sortCollection();
    var currenciesList = this._currency.values.map((item, index) => {
      return <FilterListItem
        key={index}
        name={item.name}
        id={`country-${item.name}-${index}`}
        selected={item.selected}
        disabled={item.disabled}
        onChange={ (value) => {
          this.props.currency.values[index].selected = value;
          this.props.onChange(this.props.currency)
        }} />
    });
    return (
      <ul className="filter__dropdown-menu">
        <FilterListItemAll
          key="Any currency"
          name="Any currency"
          values={this.props.currency.values || []}
          onChange={ (values) => {
            this.props.currency.values = values;
            this.props.onChange(this.props.currency);
          }} />
        {currenciesList}
      </ul>
    )
  }
}

FilterCurrency.propTypes = {
  currency: React.PropTypes.object.isRequired,
  sortStrategy: React.PropTypes.func
};

export default FilterCurrency