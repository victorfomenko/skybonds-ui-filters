import React, { Component } from 'react';
import FilterComponent from '../components/FilterComponent';
import FilterListItem from '../components/FilterListItem';
import FilterListItemAll from '../components/FilterListItemAll';


class FilterIndustry extends FilterComponent {
  constructor(props) {
    super(props);
    this.props.industry.values = this.props.industry.values || [];
    this._industry = this.props.industry;
    this.initValues(this.props.industry);
    this.initFilterName('Industry');
    this.prefixName = 'filters_industry';
  }

  _sortCollection(){
    if (this.props.industry.sortStrategy == null) {return null}
    this._industry.values.sort(this.props.industry.sortStrategy)
  }

  _getClass(name) {
    var industryBoldList = [
      'Municipal',
      'Sovereign'
    ];
    if (industryBoldList.indexOf(name) != -1 ){
      return 'filter__dropdown-item_highlighted'
    }
  }

  content() {
    this._sortCollection();
    var countriesList = this._industry.values.map((item, index) => {
      return <FilterListItem
        key={index}
        id={`industry-${item.name}-${index}`}
        name={item.name}
        selected={item.selected}
        disabled={item.disabled}
        tag={item.tag}
        className={this._getClass(item.name)}
        onChange={ (value) => {
          this.props.industry.values[index].selected = value;
          this.props.onChange(this.props.industry)
        }} />
    });

    return (
      <ul className="filter__dropdown-menu">
        <FilterListItemAll
          key="All industries"
          name="All industries"
          values={this.props.industry.values || []}
          onChange={ (values) => {
            this.props.industry.values = values;
            this.props.onChange(this.props.industry);
          }} />

        <li>
          <ul className="filter__dropdown-columns">
            {countriesList}
          </ul>
        </li>
      </ul>
    )
  }
}

FilterIndustry.propTypes = {
  industry: React.PropTypes.object.isRequired,
  sortStrategy: React.PropTypes.func
};

export default FilterIndustry