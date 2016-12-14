import React, { Component } from 'react';
import FilterListItemAllAbstract from '../components/abstract/FilterListItemAllAbstract';

class FilterListItemRatingAll extends FilterListItemAllAbstract {
    constructor(props) {
        super(props);
        this._onMouseOver = this._onMouseOver.bind(this);
        this._onMouseOut = this._onMouseOut.bind(this);
    }

    _onMouseOver() {
        this.props.onHoverGroupChange(true)
    }

    _onMouseOut() {
        this.props.onHoverGroupChange(false)
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
                           disabled={this._isDisabled() ? 'disabled' : ''}
                    />
                    <label style={{color: this.props.color}} className={`filter__dropdown-label ${this._isDisabled() ? 'filter__dropdown-label_disabled' : '' }`} htmlFor={this.props.name}>
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