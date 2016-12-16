import React, { Component } from 'react';
import FilterListItemAbstract from '../components/abstract/FilterListItemAbstract';

class FilterListItem extends FilterListItemAbstract {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <li className={`filter__dropdown-item ${this.props.className}`}>
          <div className="filter__dropdown-link">
            <input className="filter__dropdown-checkbox"
                   type="checkbox"
                   onChange={this._onChange}
                   id={this.props.id}
                   checked={this.props.selected ? 'checked' : ''}
            />
            <label className={`filter__dropdown-label ${this.props.disabled ? 'filter__dropdown-label_disabled' : '' }`} htmlFor={this.props.id}>
              <span>{this.props.name}</span>
              <span className="filter__dropdown-tag">{this.props.tag}</span>
            </label>
          </div>
        </li>
    );
  }

}

export default FilterListItem