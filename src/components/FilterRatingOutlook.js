import React, { Component } from 'react';
import FilterComponent from '../components/FilterComponent';
import FilterListItem from '../components/FilterListItem';
import FilterListItemRating from '../components/FilterListItemRating';
import FilterListItemAll from '../components/FilterListItemAll';
import FilterListItemRatingAll from '../components/FilterListItemRatingAll';
import {ConvertToRGB} from '../helpers/ConvertToRGB';

class FilterRatingOutlook extends FilterComponent {
  constructor(props) {
    super(props);
    this.initValues(props.rating, props.outlook);
    this.initFilterName('Rating & Outlook');
    this.prefixName = 'filters_rating';
    this.state = { groupHover: '' }
  }

  componentWillReceiveProps(props){
    this.initValues(props.rating, props.outlook);
  }

  _getRatingsByGroup() {
    var result = {};
    var {rating} = this.props;
    (rating.values || []).forEach((rating)=>{
      var group = /^[A-Z]+/i.exec(String(typeof rating.name !== "undefined" && rating.name !== null ? rating.name : ''));
      if ( group != null) {
        if (result[ group[0] ] == null) {
          result[group[0]] = {};
        }
        result[ group[0] ].color = rating.color;
        var base = result[ group[0] ];
        if (base['values'] == null) {
          base['values'] = [];
        }
        base['values'].push(rating);
      }
    });
    return result;
  }

  _getFilterName(){
    if(!this._isSelected()){ return this.__filterName }
    const selectedValues = this.__values.filter( (value)=>{
      return value.selected ? value.selected : false
    });
    const selectedValuesNames = selectedValues.map( (value)=>{
      return this._map(value.name)
    });
    var groups =  this._getRatingsByGroup();
    var ratingGroupsCount = this._ratingGroupsCount(groups);

    var ratingSelectedValuesNames = [];
    var outlookSelectedValuesNames = [];

    for (var i = 0, len = selectedValuesNames.length; i < len; i++) {
      var isRatingItem = false;
      for(var group in ratingGroupsCount) {
        if (selectedValuesNames[i].replace(/[+-]/g, '') === group) {
          isRatingItem = true;
          break
        }
      }
      if (isRatingItem) { ratingSelectedValuesNames.push(selectedValuesNames[i]); }
      else { outlookSelectedValuesNames.push(selectedValuesNames[i]); }
    }

    var result = [];
    for(var group in ratingGroupsCount) {
      var ratingsOfGroup = [];

      for (var i = 0, len = ratingSelectedValuesNames.length; i < len; i++) {
        var rating = ratingSelectedValuesNames[i];
        if (rating.replace(/[+-]/g, '') === group) {
          ratingsOfGroup.push(rating);
        }
      }
      if (ratingGroupsCount[group] > 1 && ratingsOfGroup.length === ratingGroupsCount[group]) {
        result.push('all ' + group);
      } else {
        result = result.concat(ratingsOfGroup);
      }
    }

    return result.concat(outlookSelectedValuesNames).join(', ')
  }

  _ratingGroupsCount(ratingGroups){
    var result = {};
    for(var groupName in ratingGroups) {
      result[ groupName ] = ratingGroups[ groupName ].values.length
    }
    return result;
  }

  getOutlookList () {
    var {outlook} = this.props;
    return (outlook.values || []).map((item, index) => {
      var name = this._map(item.name);
      return <FilterListItem
          key={item.name}
          id={`outlook-${item.name}-${index}`}
          selected={item.selected}
          name={name}
          disabled={item.disabled}
          tag={item.tag}
          onChange={ (value) => {
          this.props.outlook.values[index].selected = value;
          this.props.onChange({outlook: this.props.outlook})
        }} />
      });
  }

  _getRgbaBackground (rgbColor){
    if (rgbColor != null) {
      return "rgba(" + rgbColor.r + "," + rgbColor.g + "," + rgbColor.b + ", 0.1)";
    }
  }

  _getAllTagCount (values) {
    var result = null;

    function isNumeric(value) {
      return !isNaN(parseFloat(value)) && isFinite(value);
    }

    values.map((item) => {
      if (item.tag != null && isNumeric(item.tag)) {
        result = result + +item.tag
      }
    });
    return result;
  }

  _getRatingGroupList () {
    var _style = (group)=> {
      var styleConfig = {color: group.color};
      if (group.name == this.state.groupHover) {
        var rgbColor = ConvertToRGB(group.color);
        var rgbaColor = this._getRgbaBackground(rgbColor);
        styleConfig[ 'backgroundColor' ] = rgbaColor
      }
      return styleConfig
    };

    var groupsMap = [];
    var groups = this._getRatingsByGroup();
    for (var key in groups) {
      var value = groups[key];

      groupsMap.push({
        name: key,
        color: value.color,
        values: value.values,
        tag: this._getAllTagCount(value.values),
        hover: false
      })
    };

    return groupsMap.map((group, index) => {
      var values = group.values.map((item, itemIndex) => {
        return <FilterListItemRating
            key={item.name}
            id={`rating-${item.name}-${itemIndex}`}
            name={item.name}
            selected={item.selected}
            disabled={item.disabled}
            color={item.color}
            tag={item.tag}
            onChange={ (value) => {
          for(var i=0; i<this.props.rating.values.length; i++){
            if (this.props.rating.values[i].name == item.name){
              this.props.rating.values[i].selected = value
            }
          }
          this.props.onChange({rating: this.props.rating})
        }} />
      });

      if (group.values.length == 1) {
        return (
            <li key={group.name}>
              <ul className="filter__dropdown-group">
                {values}
              </ul>
            </li>
        )
      }
      else {
        return (
            <li key={group.name}>
              <ul className="filter__dropdown-group" style={_style(group)}>
                <FilterListItemRatingAll
                    key={group.name}
                    id={`${group.name}-${index}`}
                    name={group.name}
                    color={group.color}
                    groupHover={this.state.groupHover}
                    tag={group.tag}
                    values={group.values || []}
                    onHoverGroupChange={ (value) => {
                      var groupHover = ''
                      if (value) {
                        groupHover = group.name
                      }
                      this.setState({ groupHover });
                  }}

                    onChange={ (values) => {
                      this.props.onChange({rating: this.props.rating});
                }} />
                {values}
              </ul>
            </li>
        )
      }

    });

  }

  _map(value){
    const lables = {
      'na': 'NA',
      'negative': 'Negative',
      'stable': 'Stable',
      'positive': 'Positive'
    };
    if(lables[value] != null) { return lables[value] }
    return value
  }

  content() {
    this.sortCollection('rating');
    this.sortCollection('outlook');
    var outlookList = this.getOutlookList();
    var groupsList = this._getRatingGroupList();

    return (
      <div className="filter__dropdown-menu">
        <div className="filter__dropdown-section filter__dropdown-section_ratings">
          <ul className="filter__dropdown-list">
            <FilterListItemAll
              key="All ratings"
              name="All ratings"
              values={this.props.rating.values || []}
              onChange={ (values) => {
                this.props.rating.values = values;
                this.props.onChange({rating: this.props.rating});
              }} />
            {groupsList}
          </ul>
        </div>
        <div className="filter__dropdown-section filter__dropdown-section_outlook">
          <ul className="filter__dropdown-list">
            <FilterListItemAll
              key="All outlook"
              name="All outlook"
              values={this.props.outlook.values || []}
              onChange={ (values) => {
                this.props.outlook.values = values;
                this.props.onChange({outlook: this.props.outlook});
              }} />
            {outlookList}
          </ul>
        </div>
      </div>
   );
  }
}

FilterRatingOutlook.propTypes = {
  rating: React.PropTypes.object.isRequired,
  outlook: React.PropTypes.object.isRequired
};

export default FilterRatingOutlook

