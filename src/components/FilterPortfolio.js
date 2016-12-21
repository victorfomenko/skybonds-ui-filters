import React, { Component } from 'react';
import FilterComponent from '../components/FilterComponent';
import FilterListItem from '../components/FilterListItem';


class FilterPortfolio extends FilterComponent {
  constructor(props) {
    super(props);
    this.initValues(props.portfolio);
    this.initFilterName('Portfolio');
  }

  componentWillReceiveProps(props){
    this.initValues(props.portfolio);
  }

  render() {
    var portfolioList;
    var portfolioWrapper;
    var {portfolio} = this.props;
    portfolioList = (portfolio.values || []).map((item, index) => {
      return <FilterListItem
        key={index}
        name={item.name}
        id={`country-${item.name}-${index}`}
        selected={item.selected}
        disabled={item.disabled}
        onChange={ (value) => {
          portfolio.values[index].selected = value;
          this.props.onChange(portfolio)
        }} />
    });
    if((portfolio.values || []).length > 0) {
      portfolioWrapper =
        <div className="filter__container filter__container_single">
          <ul>
            {portfolioList}
          </ul>
        </div>
    } else {
      return null
    }

    return (
      <div className={`${portfolioList.length > 0 ? 'filter' : ''} ${this._isSelected() ? 'filter_selected' : ''}`}>
        {portfolioWrapper}
      </div>
    )
  }
}

FilterPortfolio.propTypes = {
  portfolio: React.PropTypes.object.isRequired
};

export default FilterPortfolio
