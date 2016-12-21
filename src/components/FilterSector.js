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
    this.initValues(this.props.domInt, this.props.corporations, this.props.financial, this.props.government);
    this.initFilterName('Sector');
  }

  _checkProps() {
    this.props.domInt.values = this.props.domInt.values || [];
    this.props.corporations.values = this.props.corporations.values || [];
    this.props.financial.values = this.props.financial.values || [];
    this.props.government.values = this.props.government.values || [];
  }

  _map(value){
    const lables = {
      'domestic': 'Domestic',
      'international': 'International',
      'corporations': 'Corporations',
      'non-corporations': 'Non-corporations',
      'financial': 'Financial',
      'non-financial': 'Non-financial',
      'true': 'Government',
      'false': 'Non-government',
    };
    if(lables[value] != null) { return lables[value] }
  };

  content() {
    var domIntList = this._domInt.values.map((item, index) => {
      var name = this._map(item.name);
      return <FilterListItem
        key={item.name}
        id={`domInt-${item.name}-${index}`}
        name={name}
        selected={item.selected}
        disabled={item.disabled}
        tag={item.tag}
        onChange={ (value) => {
          this.props.domInt.values[index].selected = value;
          this.props.onChange({domInt: this.props.domInt})
        }} />
    });

    var corporationsList = this._corporations.values.map((item, index) => {
      var name = this._map(item.name);
      return <FilterListItem
        key={item.name}
        id={`corporations-${item.name}-${index}`}
        selected={item.selected}
        name={name}
        disabled={item.disabled}
        tag={item.tag}
        onChange={ (value) => {
          this.props.corporations.values[index].selected = value;
          this.props.onChange({corporations: this.props.corporations})
        }} />
    });

    var financialList = this._financial.values.map((item, index) => {
      var name = this._map(item.name);
      return <FilterListItem
        key={item.name}
        id={`financial-${item.name}-${index}`}
        selected={item.selected}
        name={name}
        disabled={item.disabled}
        tag={item.tag}
        onChange={ (value) => {
          this.props.financial.values[index].selected = value;
          this.props.onChange({financial: this.props.financial})
        }} />
    });

    var governmentList = this._government.values.map((item, index) => {
      var name = this._map(item.name);
      return (
        <FilterListItem
          key={item.name}
          id={`government-${item.name}-${index}`}
          selected={item.selected}
          name={name}
          disabled={item.disabled}
          tag={item.tag}
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

