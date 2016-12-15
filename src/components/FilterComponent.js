import React, { Component } from 'react';

export default class FilterComponent extends Component {

  constructor(props) {
    super(props);
    this.__values = [];
    this.__filterName = 'Filter'
    this.prefixName = ''
  }


  initFilterName(filterName){
    if(typeof filterName !== 'string'){return null}
    this.__filterName = filterName
  }


  initValues(...args){
    const result = [];
    for(var i=0; i<args.length; i++){
      var values = args[i];
      values.forEach((item)=>{
        result.push(item)
      })
    }

    this.__values = result
  }


  _isDisabled(){
    var result = true;
    this.__values.forEach( (value)=>{
      if(!value.disabled){
        result = false
      }
    });
    return result
  }


  _isSelected(){
    var result = false;
    this.__values.forEach( (value)=>{
      if(value.selected){
        result = true
      }
    });
    return result
  }


  _map(name){return name}


  _getFilterName(){
    if(!this._isSelected()){ return this.__filterName }
    const selectedValues = this.__values.filter( (value)=>{
      return value.selected ? value.selected : false
    });
    const selectedValuesNemes = selectedValues.map( (value)=>{
      return this._map(value.name)
    });
    return selectedValuesNemes.join(', ')
  }


  render(){
    return(
      <div className={`filter ${this._isDisabled() ? 'filter_disabled' : ''} ${this._isSelected() ? 'filter_selected' : ''} ${this.prefixName}`}>
        <div className="filter__container">
          <button type="button" className="filter__button">
            <span className="filter__name">{this._getFilterName()}</span>
            <span className="filter__caret" />
          </button>
          <div className="filter__dropdown">
            <div className="filter__dropdown-content">
              {this.content && this.content()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}