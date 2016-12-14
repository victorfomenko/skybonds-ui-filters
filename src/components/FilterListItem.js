import React, { Component } from 'react';
import {ConvertToRGB} from '../helpers/ConvertToRGB';

class FilterListItem extends Component {
  constructor(props) {
    super(props);
    this._onChange =    this._onChange.bind(this);
    this._onMouseOver = this._onMouseOver.bind(this);
    this._onMouseOut = this._onMouseOut.bind(this);
    this._style = this._style.bind(this);
    this.state = { hovered: false }

  }

  _onChange() {
    this.props.onChange(!this.props.selected)
  }

  _style() {
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
                 disabled={this.props.disabled ? 'disabled' : ''}
          />
          <label style={this._style()} className={`filter__dropdown-label ${this.props.disabled ? 'filter__dropdown-label_disabled' : '' }`} htmlFor={this.props.id}>
            <span>{this.props.name}</span>
          </label>
        </div>
      </li>
    );
  }
}

FilterListItem.propTypes = {
  name: React.PropTypes.string.isRequired,
  color: React.PropTypes.string,
  disabled: React.PropTypes.bool,
  onChange: React.PropTypes.func.isRequired,
  selected: React.PropTypes.bool
};

export default FilterListItem