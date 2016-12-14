import React, { Component } from 'react';
import FilterListItemAllAbstract from '../components/abstract/FilterListItemAllAbstract';

class FilterListItemAll extends FilterListItemAllAbstract {
  constructor(props) {
    super(props);
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
                   disabled={this._isDisabled() ? 'disabled' : ''}
            />
            <label className={`filter__dropdown-label ${this._isDisabled() ? 'filter__dropdown-label_disabled' : '' }`} htmlFor={this.props.name}>
              <span>{this.props.name}</span>
            </label>
          </div>
        </li>
    );
  }

}

export default FilterListItemAll