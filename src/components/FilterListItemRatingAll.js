import React, { Component } from 'react';
import FilterListItemAllAbstract from '../components/abstract/FilterListItemAllAbstract';

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
            } else if(!item.disabled) {
                item.selected = toggleTo;
            }

            return item
        });
    }

    render() {
        return (
            <li className="filter__dropdown-item filter__dropdown-item_all" onMouseOver={this._onMouseOver} onMouseOut={this._onMouseOut}>
                <div className="filter__dropdown-link">
                    <input className="filter__dropdown-checkbox"
                           onChange={this._onChange}
                           type="checkbox"
                           id={this.props.name}
                           checked={this._isAllChecked() ? 'checked' : ''}
                    />
                    <label style={this._style()} className={`filter__dropdown-label ${this._isDisabled() ? 'filter__dropdown-label_disabled' : '' }`} htmlFor={this.props.name}>
                        <span>{this.props.name}</span>
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