import React, { Component } from 'react';
import FilterListItemAllAbstract from '../components/abstract/FilterListItemAllAbstract';
import style from '../style/filter.sass';

class FilterListItemAll extends FilterListItemAllAbstract {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <li className={`${style.filter__dropdownItem} ${style.filter__dropdownItem_all}`}>
        <div className={style.filter__dropdownLink}>
          <input className={style.filter__dropdownCheckbox}
                 onChange={this._onChange}
                 type="checkbox"
                 id={this.props.name}
                 checked={this._isAllChecked() ? 'checked' : ''}
          />
          <label className={`${style.filter__dropdownLabel} ${this._isDisabled() ? style.filter__dropdownLabel_disabled : '' }`} htmlFor={this.props.name}>
            <span>{this.props.name}</span>
          </label>
        </div>
      </li>
    );
  }

}

export default FilterListItemAll