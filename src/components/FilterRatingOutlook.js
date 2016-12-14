import React, { Component } from 'react';
import FilterComponent from '../components/FilterComponent';
import FilterListItem from '../components/FilterListItem';
import FilterListItemAll from '../components/FilterListItemAll';
import FilterListItemRatingAll from '../components/FilterListItemRatingAll';
import {ConvertToRGB} from '../helpers/ConvertToRGB';

class FilterRatingOutlook extends FilterComponent {
  constructor(props) {
    super(props);
    this._checkProps();
    this._rating = this.props.rating;
    this._outlook = this.props.outlook;
    this.initValues(this.props.rating.values, this.props.outlook.values);
    this.initFilterName('Rating & Outlook');
    this.prefixName = 'filters_rating';
    this.state = { groupHover: '' }
  }

  _checkProps() {
    this.props.rating.values = this.props.rating.values || [];
    this.props.outlook.values = this.props.outlook.values || [];
  }

  _getRatingsByGroup() {
    var result = {};
    this._rating.values.forEach((rating)=>{
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

  _sortCollections(){
    if (this.props.rating.sortStrategy == null) {return null}
    this._rating.values.sort(this.props.rating.sortStrategy);

    if (this.props.outlook.sortStrategy == null) {return null}
    this._outlook.values.sort(this.props.outlook.sortStrategy)
  }

  getOutlookList () {
    return this._outlook.values.map((item, index) => {
      return <FilterListItem
          key={item.name}
          id={`outlook-${item.name}-${index}`}
          selected={item.selected}
          name={item.name}
          disabled={item.disabled}
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

  _getGroupList () {
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
        hover: false
      })
    }

    return groupsMap.map((group, index) => {
      var values = group.values.map((item, itemIndex) => {
        return <FilterListItem
            key={item.name}
            id={`rating-${item.name}-${itemIndex}`}
            name={item.name}
            selected={item.selected}
            disabled={item.disabled}
            color={item.color}
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


  content() {
    this._sortCollections();
    var outlookList = this.getOutlookList();

    var groupsList = this._getGroupList();

    return (
      <div className="filter__dropdown-menu">
        <div className="filter__dropdown-menu_ratings">
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
        <div className="filter__dropdown-menu_outlook">
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

