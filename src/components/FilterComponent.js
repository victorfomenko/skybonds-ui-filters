import React, { Component } from 'react';
import style from '../style/filter.sass';

export default class FilterComponent extends Component {

  constructor(props) {
    super(props);
    this.__values = [];
    this.__filterName = 'Filter';
    this.prefixName = ''
  }


  initFilterName(filterName){
    if(typeof filterName !== 'string'){return null}
    this.__filterName = filterName
  }


  initValues(...filters){
    const result = [];
    for(var i=0; i<filters.length; i++) {
      var filter = filters[i];
      if (filter == null) { filter = {} }
      var values = filter.values || [];
      var sortStrategy = filter.sortStrategy || null;
      if(sortStrategy != null){ values.sort(sortStrategy); }
      values.forEach((item)=> {
        result.push(item)
      });
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


  sortCollection(filterName){
    if(filterName == null){return null}
    if (this.props[filterName].sortStrategy == null) {return null}
    this.props[filterName].values.sort(this.props[filterName].sortStrategy)
  }


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
      <div className={`${style.filter} ${this._isDisabled() ? style.filter_disabled : ''} ${this._isSelected() ? style.filter_selected : ''} ${this.prefixName}`}>
        <div className={style.filter__container}>
          <button type="button" className={style.filter__button}>
            <span className={style.filter__name}>{this._getFilterName()}</span>
            <span className={style.filter__caret} />
          </button>
          <div className={style.filter__dropdown}>
            <div className={style.filter__dropdownContent}>
              {this.content && this.content()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}