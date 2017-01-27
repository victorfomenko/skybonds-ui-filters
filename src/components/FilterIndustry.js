import React, { Component } from 'react';
import FilterComponent from '../components/FilterComponent';
import FilterListItem from '../components/FilterListItem';
import FilterListItemAll from '../components/FilterListItemAll';
import style from '../style/filter.sass';


class FilterIndustry extends FilterComponent {
  constructor(props) {
    super(props);
    this.initValues(props.industry);
    this.initFilterName('Industry');
    this.prefixName = style.filters_industry;
  }


  componentWillReceiveProps(props){
    this.initValues(props.industry);
  }


  _getClass(name) {
    var industryBoldList = [
      'Municipal',
      'Sovereign'
    ];
    if (industryBoldList.indexOf(name) != -1 ){
      return style.filter__dropdownItem_highlighted
    }
  }

  content() {
    this.sortCollection('industry');
    var {industry} = this.props;
    var countriesList = (industry.values || []).map((item, index) => {
      return <FilterListItem
        key={index}
        id={`industry-${item.name}-${index}`}
        name={item.name}
        selected={item.selected}
        disabled={item.disabled}
        tag={item.tag}
        className={this._getClass(item.name)}
        onChange={ (value) => {
          industry.values[index].selected = value;
          this.props.onChange(industry)
        }} />
    });

    return (
      <ul className={style.filter__dropdownMenu}>
        <FilterListItemAll
          key="All industries"
          name="All industries"
          values={industry.values || []}
          onChange={ (values) => {
            industry.values = values;
            this.props.onChange(industry);
          }} />

        <li>
          <ul className={style.filter__dropdownColumns}>
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