import React, { Component } from 'react';
import FilterComponent from '../components/FilterComponent';
import FilterRangeInput from '../components/FilterRangeInput';
import style from '../style/filter.sass';


class FilterRange extends FilterComponent {
  constructor(props) {
    super(props);
    this.initValues(props.range);
  }

  componentWillReceiveProps(props){
    this.initValues(props.range);
  }

  _mapLabels(value){
    const lables = {
      'yield': 'Yield',
      'spread': 'Spread',
      'price': 'Price',
      'duration': 'Duration',
      'maturity': 'Maturity',
      'discount': 'Discount'
    };
    if(lables[value] != null) { return lables[value] }
    return value
  }

  _mapFormats(value){
    const formats = {
      'yield': '%',
      'spread': 'BPS',
      'price': '%',
      'duration': 'YRS',
      'maturity': 'YRS',
      'discount': '%'
    };
    if(formats[value] != null) { return formats[value] }
    return value
  }


  rangeValueChanged(index, rangeType, value, isChanged) {
    var range = this.props.range.values[index];
    var minValue = this.processRangeValue(range.values[0], range.defaultValues[0]);
    var maxValue = this.processRangeValue(range.values[1], range.defaultValues[1]);
    range.selected = true;

    switch(rangeType) {
      case 'min':
        minValue = isChanged ? value.toString() : range.defaultValues[0];
        break;
      case 'max':
        maxValue = isChanged ? value.toString() : range.defaultValues[1];
        break;
    }
    range.values[0] = minValue || Number.NEGATIVE_INFINITY;
    range.values[1] = maxValue || Number.POSITIVE_INFINITY;

    const haveNoValues = !minValue && !maxValue;
    const valuesEqualDefaults = minValue == range.defaultValues[0] && maxValue == range.defaultValues[1];
    if(haveNoValues || valuesEqualDefaults) { range.selected = false; }
    this.props.onChange(this.props.range);
  }

  processRangeValue(value, defaultValue){
    if(!defaultValue && typeof defaultValue !== 'number') {
      defaultValue = null;
    }
    if(!this.isValueChanged(value)) {
      value = defaultValue;
    }
    return value;
  }

  isValueChanged(value) {
    if(!value && typeof value !== 'number' || (value == Number.POSITIVE_INFINITY || value == Number.NEGATIVE_INFINITY)) {
      return false;
    }
    return true;
  }

  roundValue(value) {
    if(value) {
      return Math.round(value * 100) / 100;
    }
  }

  render() {
    this.sortCollection('range');
    const {range} = this.props;
    var rangeList = ((range.values || []).map((item, index) => {
      var name = this._mapLabels(item.name);
      var format = this._mapFormats(item.name);
      var minChanged = this.isValueChanged(item.values[0]);
      var maxChanged = this.isValueChanged(item.values[1]);
      var min = this.roundValue(this.processRangeValue(item.values[0], item.defaultValues[0]));
      var max = this.roundValue(this.processRangeValue(item.values[1], item.defaultValues[1]));
      switch (name) {
        case 'Spread':
          if(max > 100000){max = 100000}
          break;
        case 'Yield':
          if(max > 1000){max = 1000}
          break;
      }
      return <li key={index} className={`${style.filter__dropdownItem} ${style.rangeListItem}`}>
              <span className={style.rangeListItemLabel}>
                {name}
                <span className={style.rangeListItemSublabel}>{format}</span>
              </span>
              <span className={`${style.rangeListItemValue} ${style.rangeListItemMin}`}>
                <FilterRangeInput
                  index={index}
                  minValue={min}
                  maxValue={max}
                  rangeType='min'
                  isChanged={minChanged}
                  callbackMethod={this.rangeValueChanged.bind(this)} />
              </span>
              <span className={`${style.rangeListItemValue} ${style.rangeListItemMax}`}>
                <FilterRangeInput
                  index={index}
                  minValue={min}
                  maxValue={max}
                  rangeType='max'
                  isChanged={maxChanged}
                  callbackMethod={this.rangeValueChanged.bind(this)} />
              </span>
            </li>
    }));

    var rangeHeader = <li key='header' className={style.rangeListHeader}>
      <span className={style.rangeListHeaderLabel}/>
      <span className={style.rangeListHeaderMin}>Min</span>
      <span className={style.rangeListHeaderMax}>Max</span>
    </li>;

    var loader = <div className={`${style.loadingCover} ${style.dynamicCover}`}>
                  <div className={style.loadingMessageContainer}>
                      <div className={style.loadingCaption}>
                          <span className='ng-scope'>Loading filters</span>
                      </div>
                      <div className={style.spinner}>
                          <div className={style.bounce1}></div>
                          <div className={style.bounce2}></div>
                          <div className={style.bounce3}></div>
                      </div>
                  </div>
                </div>;

    return (
    <div className={`${style.filter} ${this._isDisabled() ? style.filter_disabled : ''} ${this._isSelected() ? style.filter_selected : ''}`}>
      <div className={style.filter__container}>
        <button type='button' className={style.filter__button}>
          <span className={style.filter__name}>Min...Max</span>
          <span className={style.filter__caret}/>
        </button>
        <div className={this.props.range.showLoader ? `${style.filter__dropdown} ${style.range-dropdown} ${style.empty}` : `${style.filter__dropdown} ${style.rangeDropdown}`}>
          <div className={`${style.filter__dropdownContent} ${style.rangeDropdownContent}`}>
            {loader}
            <ul className={`${style.filter__dropdownMenu} ${style.rangeList}`}>
              {rangeHeader}
              {rangeList}
            </ul>
          </div>
        </div>
      </div>
    </div>
    )
  }
}

FilterRange.propTypes = {
  range: React.PropTypes.object.isRequired
};

export default FilterRange
