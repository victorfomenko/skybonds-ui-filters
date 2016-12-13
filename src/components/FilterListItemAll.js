import React, { Component } from 'react';

class FilterListItemAll extends Component {
  constructor(props) {
    super(props);
    this._onChange = this._onChange.bind(this);
    this._toggleAll = this._toggleAll.bind(this);
  }

  _isDisabled(){
    var result = true;
    this.props.values.forEach((value) => {
      if(!value.disabled) {
        result = false
      }
    });
    return result
  }

  _isAllChecked(){
    var condition1 = true;
    var condition2 = false;
    this.props.values.forEach((value) => {
      if(value.selected && !value.disabled){condition2=true}
      if(!value.selected && !value.disabled) {condition1 = false}
    });
    return condition1 && condition2 && this.props.values.length > 0
  }

  _toggleAll(toggleTo){
    this.props.values.forEach((item) => {
      if(!item.disabled) {
        item.selected = toggleTo;
      }
      return item
    });
  }

  _onChange() {
    this._toggleAll(!this._isAllChecked());
    this.props.onChange(this.props.values)
  }

  render() {
    return (
      <li className="filter__dropdown-item filter__dropdown-item_all">
        <div className="filter__dropdown-link">
          <input className="filter__dropdown-checkbox"
                 onChange={this._onChange}
                 type="checkbox"
                 id={this.props.name}
                 checked={this._isAllChecked() ? 'checked' : ''}
          />
          <label className={`filter__dropdown-label ${this._isDisabled() ? 'filter__dropdown-label_disabled' : '' }`} htmlFor={this.props.name}>
            <span>{this.props.name}</span>
          </label>
        </div>
      </li>
    );
  }

}

FilterListItemAll.propTypes = {
  name: React.PropTypes.string.isRequired,
  values: React.PropTypes.array.isRequired,
  onChange: React.PropTypes.func.isRequired
};

export default FilterListItemAll