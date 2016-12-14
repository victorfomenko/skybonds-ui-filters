import React, { Component } from 'react';
import FilterComponent from '../components/FilterComponent';
import FilterListItem from '../components/FilterListItem';
import FilterListItemAll from '../components/FilterListItemAll';

class FilterRatingOutlook extends FilterComponent {
  constructor(props) {
    super(props);
    this._checkProps();
    this._rating = this.props.rating;
    this._outlook = this.props.outlook;
    this.initValues(this.props.rating.values, this.props.outlook.values);
    this.initFilterName('Rating & Outlook');
  }

  _checkProps() {
    this.props.rating.values = this.props.rating.values || [];
    this.props.outlook.values = this.props.outlook.values || [];
  }

  _sortCollections(){
    if (this.props.rating.sortStrategy == null) {return null}
    this._rating.values.sort(this.props.rating.sortStrategy);

    if (this.props.outlook.sortStrategy == null) {return null}
    this._outlook.values.sort(this.props.outlook.sortStrategy)
  }


  _mapOutlook(value){
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
    this._sortCollections();
    var ratingList = this._rating.values.map((item, index) => {
      return <FilterListItem
        key={item.name}
        id={`rating-${item.name}-${index}`}
        name={item.name}
        selected={item.selected}
        disabled={item.disabled}
        tag={item.tag}
        onChange={ (value) => {
          this.props.rating.values[index].selected = value;
          this.props.onChange({rating: this.props.rating})
        }} />
    });
    var outlookList = this._outlook.values.map((item, index) => {
      var name = this._mapOutlook(item.name);
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

    return (
      <ul className="filter__dropdown-menu">
        <FilterListItemAll
          key="All ratings"
          name="All ratings"
          values={this.props.rating.values || []}
          onChange={ (values) => {
            this.props.rating.values = values;
            this.props.onChange({rating: this.props.rating});
          }} />
        {ratingList}
        <li className="filter__dropdown-divider"/>
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
   );
  }
}

FilterRatingOutlook.propTypes = {
  rating: React.PropTypes.object.isRequired,
  outlook: React.PropTypes.object.isRequired
};

export default FilterRatingOutlook

