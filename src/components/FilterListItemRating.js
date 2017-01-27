import React, { Component } from 'react';
import FilterListItemAbstract from '../components/abstract/FilterListItemAbstract';
import {ConvertToRGB} from '../helpers/ConvertToRGB';
import style from '../style/filter.sass';

class FilterListItemRating extends FilterListItemAbstract {
    constructor(props) {
        super(props);
        this._onMouseOver = this._onMouseOver.bind(this);
        this._onMouseOut = this._onMouseOut.bind(this);
        this._style = this._style.bind(this);
        this.state = { hovered: false }
    }

    _style() {
         
        var rgbColor = ConvertToRGB(this.props.color);
        var rgbaColor = this._getRgbaBackground(rgbColor);

        if (this.state.hovered) {
            if (this.props.disabled) {
                return {backgroundColor: rgbaColor}
            }
            return { color: this.props.color, backgroundColor: rgbaColor }
        } else {
            if (!this.props.disabled) {
                return {color: this.props.color}
            }
        }
    }

    _getRgbaBackground (rgbColor){
        if (rgbColor != null) {
            return 'rgba(' + rgbColor.r + ',' + rgbColor.g + ',' + rgbColor.b + ', 0.1)';
        }
    }

    _onMouseOver() {
        this.setState({ hovered: true });
    }

    _onMouseOut() {
        this.setState({ hovered: false });
    }

    render() {
        return (
            <li className={style.filter__dropdownItem} onMouseOver={this._onMouseOver} onMouseOut={this._onMouseOut}>
                <div className={style.filter__dropdownLink}>
                    <input className={style.filter__dropdownCheckbox}
                           type='checkbox'
                           onChange={this._onChange}
                           id={this.props.id}
                           checked={this.props.selected ? 'checked' : ''}
                    />
                    <label style={this._style()} className={`${style.filter__dropdownLabel} ${this.props.disabled ? style.filter__dropdownLabel_disabled : '' }`} htmlFor={this.props.id}>
                        <span>{this.props.name}</span>
                        <span className={style.filter__dropdownTag}>{this.props.tag}</span>
                    </label>
                </div>
            </li>
        );
    }
}

FilterListItemRating.propTypes = {
    color: React.PropTypes.string,
};

export default FilterListItemRating