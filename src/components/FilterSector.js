import React, { Component } from 'react';
import FilterComponent from '../components/FilterComponent';
import FilterListItem from '../components/FilterListItem';
import style from '../style/filter.sass';

class FilterSector extends FilterComponent {
  constructor(props) {
    super(props);
    this.initValues(props.domInt, props.corporations, props.financial, props.government);
    this.initFilterName('Sector');
  }


  componentWillReceiveProps(props){
    this.initValues(props.domInt, props.corporations, props.financial, props.government);
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
    return value
  };

  content() {
    var {domInt, corporations, financial, government} = this.props;

    var domIntList = (domInt.values || []).map((item, index) => {
      var name = this._map(item.name);
      return <FilterListItem
        key={item.name}
        id={`domInt-${item.name}-${index}`}
        name={name}
        selected={item.selected}
        disabled={item.disabled}
        tag={item.tag}
        onChange={ (value) => {
          domInt.values[index].selected = value;
          this.props.onChange({ domInt })
        }} />
    });

    var corporationsList = (corporations.values || []).map((item, index) => {
      var name = this._map(item.name);
      return <FilterListItem
        key={item.name}
        id={`corporations-${item.name}-${index}`}
        selected={item.selected}
        name={name}
        disabled={item.disabled}
        tag={item.tag}
        onChange={ (value) => {
          corporations.values[index].selected = value;
          this.props.onChange({ corporations })
        }} />
    });

    var financialList = (financial.values || []).map((item, index) => {
      var name = this._map(item.name);
      return <FilterListItem
        key={item.name}
        id={`financial-${item.name}-${index}`}
        selected={item.selected}
        name={name}
        disabled={item.disabled}
        tag={item.tag}
        onChange={ (value) => {
          financial.values[index].selected = value;
          this.props.onChange({ financial })
        }} />
    });

    var governmentList = (government.values || []).map((item, index) => {
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
            government.values[index].selected = value;
            this.props.onChange({ government })
          }} />
      )
    });

    return (
      <ul className={style.filter__dropdownMenu}>
        {domIntList}
        <li className={style.filter__dropdownDivider}/>
        {corporationsList}
        <li className={style.filter__dropdownDivider}/>
        {financialList}
        <li className={style.filter__dropdownDivider}/>
        {governmentList}
      </ul>
    );
  }
}

FilterSector.propTypes = {
  domInt: React.PropTypes.object.isRequired,
  corporations: React.PropTypes.object.isRequired,
  financial: React.PropTypes.object.isRequired,
  government: React.PropTypes.object.isRequired
};

export default FilterSector

