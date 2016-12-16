import React, { Component } from 'react';

class FilterListItemAbstract extends Component {
    constructor(props) {
        super(props);
        this._onChange =    this._onChange.bind(this);
    }

    _onChange() {
        this.props.onChange(!this.props.selected)
    }

}

FilterListItemAbstract.propTypes = {
    name: React.PropTypes.string.isRequired,
    disabled: React.PropTypes.bool,
    onChange: React.PropTypes.func.isRequired,
    selected: React.PropTypes.bool,
    className: React.PropTypes.string
};

export default FilterListItemAbstract