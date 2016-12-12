import React, { Component } from 'react';

class FilterListItem extends Component {
  constructor(props) {
    super(props);
    this._onChange =    this._onChange.bind(this);
  }


  _onChange() {
    this.props.onChange(!this.props.selected)
  }


  render() {
    return (
      <li className="filter__dropdown-item">
        <div className="filter__dropdown-link">
          <input className="filter__dropdown-checkbox"
                 type="checkbox"
                 onChange={this._onChange}
                 id={this.props.id}
                 checked={this.props.selected ? 'checked' : ''}
                 disabled={this.props.disabled ? 'disabled' : ''}
          />
          <label className={`filter__dropdown-label ${this.props.disabled ? 'filter__dropdown-label_disabled' : '' }`} htmlFor={this.props.id}>
            <span>{this.props.name}</span>
          </label>
        </div>
      </li>
    );
  }
}

FilterListItem.propTypes = {
  name: React.PropTypes.string.isRequired,
  disabled: React.PropTypes.bool,
  onChange: React.PropTypes.func.isRequired,
  selected: React.PropTypes.bool
};

export default FilterListItem