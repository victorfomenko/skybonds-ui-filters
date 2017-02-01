import React, { Component } from 'react';
import FilterComponent from '../components/FilterComponent';
import FilterListItem from '../components/FilterListItem';
import FilterListItemAll from '../components/FilterListItemAll';
import style from '../style/filter.sass';


class FilterCurrency extends FilterComponent {
  constructor(props) {
    super(props);
    this.initValues(props.currency);
    this.initFilterName('Currency');
    this.prefixName = 'filters_сurrency';
  }


  componentWillReceiveProps(props){
    this.initValues(props.currency);
  }

  _getClass(name) {
    var currencyBoldList = [
      'RUB',
      'USD',
      'EUR'
    ];
    if (currencyBoldList.indexOf(name) != -1 ){
      return style.filter__dropdownItem_highlighted
    }
  }

  content() {
    this.sortCollection('currency');
    var {currency} = this.props;
    var currenciesList = (currency.values || []).map((item, index) => {
      return <FilterListItem
        key={index}
        name={item.name}
        id={`country-${item.name}-${index}`}
        selected={item.selected}
        disabled={item.disabled}
        className={this._getClass(item.name)}
        tag={item.tag}
        onChange={ (value) => {
          currency.values[index].selected = value;
          this.props.onChange(currency)
        }} />
    });
    return (
      <ul className={style.filter__dropdownMenu}>
        <FilterListItemAll
          key="All currencies"
          name="All currencies"
          values={currency.values || []}
          onChange={ (values) => {
            currency.values = values;
            this.props.onChange(currency);
          }} />
        <li>
          <ul className={style.filter__dropdownColumns}>
            {currenciesList}
          </ul>
        </li>
      </ul>
    )
  }
}

FilterCurrency.propTypes = {
  currency: React.PropTypes.object.isRequired,
  sortStrategy: React.PropTypes.func
};

export default FilterCurrency