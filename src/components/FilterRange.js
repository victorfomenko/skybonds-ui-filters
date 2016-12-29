import React, { Component } from 'react';
import FilterComponent from '../components/FilterComponent';
import FilterRangeInput from '../components/FilterRangeInput';


class FilterRange extends FilterComponent {
  constructor(props) {
    super(props);
    this.initValues(props.range);
    this.state = {
      'filtersLoaded': false
    };
  }

  componentWillReceiveProps(props){
    this.initValues(props.range);
  }

  selectInitialRanges(){
    const {range} = this.props;
    if(!this.state.filtersLoaded) {
      range.values.map((item, index) => {
         range.values[index].selected = true;
      });
      this.state = {
        'filtersLoaded': true
      };
      this.props.range.onFilterOpen(range);
      this.props.onChange(range);
    }
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

  rangeValueChanged(index, rangeType, value) {
    var {range} = this.props;
    if(rangeType == 'min') {
      range.values[index].values[0] = value;
    }
    else if(rangeType == 'max') {
      range.values[index].values[1] = value;
    }

    if(range.values[index].values[0] && range.values[index].values[1]) {
      range.values[index].selected = true
    }
    else {
      range.values[index].selected = false
    }
    this.props.onChange(range);
  }

  onMouseEnter(e) {
    // this.selectInitialRanges();
  }

  render() {
    this.sortCollection('range');
    const {range} = this.props;
    var rangeList = ((range.values || []).map((item, index) => {
      var name = this._mapLabels(item.name);
      var format = this._mapFormats(item.name);
      var min = (item.values[0] ? Math.round(item.values[0]) : null);
      var max = (item.values[1] ? Math.round(item.values[1]) : null);
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
                  callbackMethod={this.rangeValueChanged.bind(this)} />
              </span>
              <span className='range-list-item-value range-list-item-max'>
                <FilterRangeInput
                  index={index}
                  minValue={min}
                  maxValue={max}
                  rangeType='max'
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
    <div className={`filter ${this._isDisabled() ? 'filter_disabled' : ''} ${this._isSelected() ? 'filter_selected' : ''}`} onMouseEnter={this.onMouseEnter.bind(this)}>
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
