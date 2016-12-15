import React, { Component } from 'react';
import FilterListItemAbstract from '../components/abstract/FilterListItemAbstract';
import {ConvertToRGB} from '../helpers/ConvertToRGB';

class FilterListItemRating extends FilterListItemAbstract {
    constructor(props) {
        super(props);
        this._onMouseOver = this._onMouseOver.bind(this);
        this._onMouseOut = this._onMouseOut.bind(this);
        this._style = this._style.bind(this);
        this.state = { hovered: false }
    }

    _style() {

        if (this.props.disabled) {
            return
        }
         
        var rgbColor = ConvertToRGB(this.props.color);
        var rgbaColor = this._getRgbaBackground(rgbColor);

        if (this.state.hovered) {
            return { color: this.props.color, backgroundColor: rgbaColor }
        } else {
            return { color: this.props.color }
        }
    }

    _getRgbaBackground (rgbColor){
        if (rgbColor != null) {
            return "rgba(" + rgbColor.r + "," + rgbColor.g + "," + rgbColor.b + ", 0.1)";
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
            <li className="filter__dropdown-item" onMouseOver={this._onMouseOver} onMouseOut={this._onMouseOut}>
                <div className="filter__dropdown-link">
                    <input className="filter__dropdown-checkbox"
                           type="checkbox"
                           onChange={this._onChange}
                           id={this.props.id}
                           checked={this.props.selected ? 'checked' : ''}
                    />
                    <label style={this._style()} className={`filter__dropdown-label ${this.props.disabled ? 'filter__dropdown-label_disabled' : '' }`} htmlFor={this.props.id}>
                        <span>{this.props.name}</span>
                        <span className="filter__dropdown-tag">{this.props.tag}</span>
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