import React, { Component } from 'react';
import FilterComponent from '../components/FilterComponent';
import FilterListItem from '../components/FilterListItem';

class FilterSector extends FilterComponent {
  constructor(props) {
    super(props);
    this._checkProps();
    this._domInt = this.props.domInt;
    this._corporations = this.props.corporations;
    this._financial = this.props.financial;
    this._government = this.props.government;
    this.initValues(this.props.domInt.values, this.props.corporations.values, this.props.financial.values, this.props.government.values);
    this.initFilterName('Sector');
  }

  _checkProps() {
    this.props.domInt.values = this.props.domInt.values || [];
    this.props.corporations.values = this.props.corporations.values || [];
    this.props.financial.values = this.props.financial.values || [];
    this.props.government.values = this.props.government.values || [];
  }

  content() {
    var domIntList = this._domInt.values.map((item, index) => {
      return <FilterListItem
        key={item.name}
        id={`domInt-${item.name}-${index}`}
        name={item.name}
        selected={item.selected}
        disabled={item.disabled}
        onChange={ (value) => {
          this.props.domInt.values[index].selected = value;
          this.props.onChange({domInt: this.props.domInt})
        }} />
    });

    var corporationsList = this._corporations.values.map((item, index) => {
      return <FilterListItem
        key={item.name}
        id={`corporations-${item.name}-${index}`}
        selected={item.selected}
        name={item.name}
        disabled={item.disabled}
        onChange={ (value) => {
          this.props.corporations.values[index].selected = value;
          this.props.onChange({corporations: this.props.corporations})
        }} />
    });

    var financialList = this._financial.values.map((item, index) => {
      return <FilterListItem
        key={item.name}
        id={`financial-${item.name}-${index}`}
        selected={item.selected}
        name={item.name}
        disabled={item.disabled}
        onChange={ (value) => {
          this.props.financial.values[index].selected = value;
          this.props.onChange({financial: this.props.financial})
        }} />
    });

    var governmentList = this._government.values.map((item, index) => {
      return (
        <FilterListItem
          key={item.name}
          id={`government-${item.name}-${index}`}
          selected={item.selected}
          name={item.name}
          disabled={item.disabled}
          onChange={ (value) => {
            this.props.government.values[index].selected = value;
            this.props.onChange({government: this.props.government})
          }} />
      )
    });

    return (
      <ul className="filter__dropdown-menu">
        {domIntList}
        <li className="filter__dropdown-divider"/>
        {corporationsList}
        <li className="filter__dropdown-divider"/>
        {financialList}
        <li className="filter__dropdown-divider"/>
        {governmentList}
      </ul>
    );
  }
}

FilterSector.propTypes = {
  domInt: React.PropTypes.object.isRequired,
  corporations: React.PropTypes.object.isRequired
};

export default FilterSector

