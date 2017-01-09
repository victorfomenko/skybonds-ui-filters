import React, { Component } from 'react';
import FilterComponent from '../components/FilterComponent';
import FilterRangeInput from '../components/FilterRangeInput';


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
      'spread': '%',
      'price': '%',
      'duration': '',
      'maturity': '',
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
    if(!value && typeof value !== 'number') {
      value = defaultValue;
    }
    if(value == Number.POSITIVE_INFINITY || value == Number.NEGATIVE_INFINITY) {
      value = defaultValue;
    }
    return value;
  }

  roundValue(value) {
    if(value) {
      return Math.round(value);
    }
  }

  render() {
    this.sortCollection('range');
    const {range} = this.props;
    var rangeList = ((range.values || []).map((item, index) => {
      var name = this._mapLabels(item.name);
      var format = this._mapFormats(item.name);

      var min = this.roundValue(this.processRangeValue(item.values[0], item.defaultValues[0]));
      var max = this.roundValue(this.processRangeValue(item.values[1], item.defaultValues[1]));
      return <li key={index} className='filter__dropdown-item range-list-item'>
              <span className='range-list-item-label'>
                {name}
                <span className='range-list-item-sublabel'>{format}</span>
              </span>
              <span className='range-list-item-value range-list-item-min'>
                <FilterRangeInput
                  index={index}
                  minValue={min}
                  maxValue={max}
                  rangeType='min'
                  isChanged={item.selected}
                  callbackMethod={this.rangeValueChanged.bind(this)} />
              </span>
              <span className='range-list-item-value range-list-item-max'>
                <FilterRangeInput
                  index={index}
                  minValue={min}
                  maxValue={max}
                  rangeType='max'
                  isChanged={item.selected}
                  callbackMethod={this.rangeValueChanged.bind(this)} />
              </span>
            </li>
    }));

    var rangeHeader = <li key='header' className='range-list-header'>
      <span className='range-list-header-label'></span>
      <span className='range-list-header-min'>Min</span>
      <span className='range-list-header-max'>Max</span>
    </li>;

    var loader = <div className='loading-cover dynamic-cover'>
                  <div className='loading-message-container'>
                      <div className='loading-caption'>
                          <span className='ng-scope'>Loading filters</span>
                      </div>
                      <div className='spinner'>
                          <div className='bounce1'></div>
                          <div className='bounce2'></div>
                          <div className='bounce3'></div>
                      </div>
                  </div>
                </div>;

    return (
    <div className={`filter ${this._isDisabled() ? 'filter_disabled' : ''} ${this._isSelected() ? 'filter_selected' : ''}`}>
      <div className='filter__container'>
        <button type='button' className='filter__button'>
          <span className='filter__name'>Min...Max</span>
          <span className='filter__caret'></span>
        </button>
        <div className={`${this.props.range.showLoader ? 'filter__dropdown range-dropdown empty' : 'filter__dropdown range-dropdown'}`}>
          <div className='filter__dropdown-content range-dropdown-content'>
            {loader}
            <ul className='filter__dropdown-menu range-list'>
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
