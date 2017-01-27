import React, { Component } from 'react';
import FilterListItemAllAbstract from '../components/abstract/FilterListItemAllAbstract';
import style from '../style/filter.sass';


class FilterListItemRatingAll extends FilterListItemAllAbstract {
    constructor(props) {
        super(props);
        this._onMouseOver = this._onMouseOver.bind(this);
        this._onMouseOut = this._onMouseOut.bind(this);
        this._style = this._style.bind(this);
    }

    _onMouseOver() {
        this.props.onHoverGroupChange(true)
    }

    _onMouseOut() {
        this.props.onHoverGroupChange(false)
    }

    _style() {
        if (this._isDisabled()) {
            return
        }
        return { color: this.props.color}
    }

    _isAllChecked() {
        var condition1 = true;
        var condition2 = false;
        this.props.values.forEach((value) => {
            if (this._isDisabled()) {
                if (value.selected) {
                    condition2 = true
                }
                if (!value.selected) {
                    condition1 = false
                }
            }
            else {
                if (value.selected && !value.disabled) {
                    condition2 = true
                }
                if (!value.selected && !value.disabled) {
                    condition1 = false
                }
            }
        });
        return condition1 && condition2 && this.props.values.length > 0
    }

    _toggleAll(toggleTo){
        this.props.values.forEach((item) => {

            if (this._isDisabled()) {
                item.selected = toggleTo;
            } else if(!item.disabled || !toggleTo) {
                item.selected = toggleTo;
            }

            return item
        });
    }

    render() {
        return (
            <li className={`${style.filter__dropdownItem} ${style.filter__dropdownItem_all}`} onMouseOver={this._onMouseOver} onMouseOut={this._onMouseOut}>
                <div className={style.filter__dropdownLink}>
                    <input className={style.filter__dropdownCheckbox}
                           onChange={this._onChange}
                           type="checkbox"
                           id={this.props.name}
                           checked={this._isAllChecked() ? 'checked' : ''}
                    />
                    <label style={this._style()} className={`${style.filter__dropdownLabel} ${this._isDisabled() ? style.filter__dropdownLabel_disabled : '' }`} htmlFor={this.props.name}>
                        <span>{this.props.name}</span>
                        <span className={style.filter__dropdownTag}>{this.props.tag}</span>
                    </label>
                </div>
            </li>
        );
    }

}

FilterListItemRatingAll.propTypes = {
    color: React.PropTypes.string,
    onHoverGroupChange: React.PropTypes.func
};

export default FilterListItemRatingAll