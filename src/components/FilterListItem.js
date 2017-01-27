import React, { Component } from 'react';
import FilterListItemAbstract from '../components/abstract/FilterListItemAbstract';
import style from '../style/filter.sass';

class FilterListItem extends FilterListItemAbstract {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <li className={`${style.filter__dropdownItem} ${this.props.className}`}>
          <div className={style.filter__dropdownLink}>
            <input className={style.filter__dropdownCheckbox}
                   type="checkbox"
                   onChange={this._onChange}
                   id={this.props.id}
                   checked={this.props.selected ? 'checked' : ''}
            />
            <label className={`${style.filter__dropdownLabel} ${this.props.disabled ? style.filter__dropdownLabel_disabled : '' }`} htmlFor={this.props.id}>
              <span>{this.props.name}</span>
              <span className={style.filter__dropdownTag}>{this.props.tag}</span>
            </label>
          </div>
        </li>
    );
  }

}

export default FilterListItem