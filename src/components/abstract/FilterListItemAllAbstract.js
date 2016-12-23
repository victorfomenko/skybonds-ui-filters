import React, { Component } from 'react';

class FilterListItemAllAbstract extends Component {
    constructor(props) {
        super(props);
        this._onChange = this._onChange.bind(this);
        this._toggleAll = this._toggleAll.bind(this);
    }

    _isDisabled(){
        var result = true;
        this.props.values.forEach((value) => {
            if(!value.disabled) {
                result = false
            }
        });
        return result
    }

    _isAllChecked(){
        var condition1 = true;
        var condition2 = false;
        this.props.values.forEach((value) => {
            if(value.selected && !value.disabled){condition2=true}
            if(!value.selected && !value.disabled) {condition1 = false}
        });
        return condition1 && condition2 && this.props.values.length > 0
    }

    _toggleAll(toggleTo){
        this.props.values.forEach((item) => {
            if(!item.disabled || !toggleTo) {
                item.selected = toggleTo;
            }
            return item
        });
    }

    _onChange() {
        this._toggleAll(!this._isAllChecked());
        this.props.onChange(this.props.values)
    }

}

FilterListItemAllAbstract.propTypes = {
    name: React.PropTypes.string.isRequired,
    values: React.PropTypes.array.isRequired,
    onChange: React.PropTypes.func.isRequired
};

export default FilterListItemAllAbstract