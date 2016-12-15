import React, { Component } from 'react';
import FilterComponent from '../components/FilterComponent';
import FilterListItem from '../components/FilterListItem';


class FilterPortfolio extends FilterComponent {
  constructor(props) {
    super(props);
    this.props.portfolio.values = this.props.portfolio.values || [];
    this._portfolio = this.props.portfolio;
    this.initValues(this.props.portfolio.values);
    this.initFilterName('Portfolio');
  }

  render() {
    var portfolioList;
    var portfolioWrapper;
    portfolioList = this._portfolio.values.map((item, index) => {
      return <FilterListItem
        key={index}
        name={item.name}
        id={`country-${item.name}-${index}`}
        selected={item.selected}
        disabled={item.disabled}
        onChange={ (value) => {
          this.props.portfolio.values[index].selected = value;
          this.props.onChange(this.props.portfolio)
        }} />
    });
    if(this._portfolio.values.length > 0) {
      portfolioWrapper =
        <div className="filter__container filter__container_single">
          <ul>
            {portfolioList}
          </ul>
        </div>
    }

    return (
      <div className={`filter ${this._isSelected() ? 'filter_selected' : ''}`}>
        {portfolioWrapper}
      </div>
    )
  }
}

FilterPortfolio.propTypes = {
  portfolio: React.PropTypes.object.isRequired
};

export default FilterPortfolio
