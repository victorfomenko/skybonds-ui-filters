import React, { Component } from 'react';

class FilterRangeInput extends Component {
  constructor(props) {
    super(props);
    var defaultValue = this.initDefaultValue(props);
    this.state = {
      'value': defaultValue,
      'isActive': false,
      'defaultValue': defaultValue,
      'isChanged': (props.isChanged || false)
    };
  }


  initDefaultValue(props){
    var value = props.minValue;
    if(props.rangeType=='max'){value = props.maxValue}
    if(!value && typeof value !== 'number') {value = ''}
    return value
  }


  componentWillReceiveProps(props){
    var defaultValue = this.initDefaultValue(props);
    this.setState({
      'value': defaultValue,
      'isActive': false,
      'defaultValue': defaultValue
    });
  }


  onChange(e){
    this.handleChange(e);
  }


  onBlur(e) {
    this.deactivateRange(e);
  }


  onFocus(e) {
    this.setActiveRange(e);
  }


  onKeyPress(e){
    if (e.which != 46 && e.which != 45 && e.which != 46 &&
      !(e.which >= 48 && e.which <= 57)) {
      e.preventDefault();
    }
    if(e.which == 13) {
      e.target.blur();
    }
    if(e.which == 27) {
      this.resetRange();
    }
  }


  setActiveRange(event) {
    event.target.select();
    this.setState({
      'isActive': true
    });
  }

  resetRange() {
    this.setState({
      'value': this.state.defaultValue,
      'isChanged': false
    }, function() {
      this.props.callbackMethod(this.props.index, this.props.rangeType, this.state.defaultValue, false);
    });
  }

  deactivateRange(event) {
    var value = (event.target.value ? parseFloat(event.target.value) : this.state.defaultValue);
    this.setState({
      'value': value,
      'isActive': false,
    }, function() {
      if(this.state.isChanged){
        this.props.callbackMethod(this.props.index, this.props.rangeType, value, true);
      }
    });
  }

  handleChange(event) {
    var value = event.target.value;
    this.setState({
      'value': value,
      'isChanged': true
    });
  }


  render() {
    var closeIcon;
    if(this.state.isChanged) {
      closeIcon = <a className='close-icon' href='javascript:void(0)' onClick={this.resetRange.bind(this)}>✕</a>;
    }
    return (
      <span>
        <input
          className={(this.state.isActive ? 'active' : '')}
          type='text'
          name={this.props.rangeType +'_'+ this.props.index}
          value={this.state.value}
          placeholder={this.props.rangeType}
          onChange={this.onChange.bind(this)}
          onBlur={this.onBlur.bind(this)}
          onFocus={this.onFocus.bind(this)}
          onKeyPress={this.onKeyPress.bind(this)}
        />
        {closeIcon}
      </span>
    );
  }

}

FilterRangeInput.propTypes = {
  index: React.PropTypes.number.isRequired,
  minValue: React.PropTypes.number,
  maxValue: React.PropTypes.number,
  rangeType: React.PropTypes.string.isRequired,
};

export default FilterRangeInput
