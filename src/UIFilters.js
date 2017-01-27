import React, { Component } from 'react';
import FilterIndustry from './components/FilterIndustry'
import FilterRatingOutlook from './components/FilterRatingOutlook'
import FilterCountry from './components/FilterCountry'
import FilterCurrency from './components/FilterCurrency'
import FilterSector from './components/FilterSector'
import FilterLiquidity from './components/FilterLiquidity'
import FilterType from './components/FilterType'
import FilterRange from './components/FilterRange'
import FilterPortfolio from './components/FilterPortfolio'
import layout from './style/layout.sass';


class UIFilters extends Component {

  constructor(props) {
    super(props);
    this.state = {
      filters: this.props.filters || {}
    };
    this.shouldTriggerOnStateChange = true;
    this._initEEListners();
  }


  _initEEListners(){
    if(this.props.ee != null) {
      this.props.ee.on('render', this._onEERender.bind(this))
    }
  }


  _onEERender(filters={}, shouldTriggerOnStateChange = false){
    this.shouldTriggerOnStateChange = shouldTriggerOnStateChange;
    for (var key in filters) {
      this.props.filters[key] = filters[key]
    }
    this.setState({ filters });
  }



  _getSelectedValues(filterObject) {
    if (filterObject == null) { filterObject = {} }
    var activeValues = [];
    const values = filterObject.values || [];
    if(Object.prototype.toString.call(values) === '[object Array]' ) {
      values.forEach( (value) => {
        if(value.selected){
          activeValues.push(value);
        }
      });
    }
    return activeValues;
  }


  _getStateObj () {
    var selected = {};
    for(const key in this.state.filters){
      var activeValues = this._getSelectedValues(this.state.filters[key]);
      if(activeValues.length > 0) {
        selected[key] = activeValues;
      }
    }
    return {
      all: this.state.filters,
      selected
    }
  }


  componentDidUpdate(){
    if(this.shouldTriggerOnStateChange){
      this.props.onStateChange(this._getStateObj());
    }
    this.shouldTriggerOnStateChange = true;
  }


  render(){
    const filterIndustry = this.state.filters.industry ?
      <FilterIndustry
        industry={this.state.filters.industry || {}}
        onChange={ (industry) => {
          this.props.filters.industry = industry;
          this.setState({filters: this.props.filters})
        }
        }
      />
      : null;

    const filterRatingOutlook = (this.state.filters.rating || this.state.filters.outlook) ?
      <FilterRatingOutlook
        rating={this.state.filters.rating || {}}
        outlook={this.state.filters.outlook || {}}
        onChange={ ({ rating, outlook }) => {
          if(rating) {this.props.filters.rating = rating}
          if(outlook) {this.props.filters.outlook = outlook}
          this.setState({filters: this.props.filters})
        }
        }
      />
      : null;

    const filterCountry = this.state.filters.country ?
      <FilterCountry
        country={this.state.filters.country || {}}
        onChange={ (country) => {
          this.props.filters.country = country;
          this.setState({filters: this.props.filters})
        }
        }
      />
      : null;

    const filterCurrency = this.state.filters.currency ?
      <FilterCurrency
        currency={this.state.filters.currency || {}}
        onChange={ (currency) => {
          this.props.filters.currency = currency;
          this.setState({filters: this.props.filters})
        }
        }
      />
      : null;
    const filterSector = (this.state.filters.domInt || this.state.filters.corporations || this.state.filters.financial || this.state.filters.government) ?
      <FilterSector
        domInt={this.state.filters.domInt || {}}
        corporations={this.state.filters.corporations || {}}
        financial={this.state.filters.financial || {}}
        government={this.state.filters.government || {}}
        onChange={ ({domInt, corporations, financial, government}) => {
          if(domInt) {this.props.filters.domInt = domInt}
          if(corporations) {this.props.filters.corporations = corporations}
          if(financial) {this.props.filters.financial = financial}
          if(government) {this.props.filters.government = government}
          this.setState({filters: this.props.filters})
        }
        }
      />
      : null;

    const filterLiquidity = this.state.filters.liquidity ?
      <FilterLiquidity
        liquidity={this.state.filters.liquidity || {}}
        onChange={ (currency) => {
            this.props.filters.liquidity = currency;
            this.setState({filters: this.props.filters})
          }
        }
      />
      : null;
    const filterType = this.state.filters.type ?
      <FilterType
        type={this.state.filters.type || {}}
        onChange={ (currency) => {
          this.props.filters.type = currency;
          this.setState({filters: this.props.filters})
        }
        }
      />
      : null;

    const filterRange = this.state.filters.range ?
      <FilterRange
        range={this.state.filters.range || {}}
        onChange={(range) => {
          this.props.filters.range = range;
          this.setState({filters: this.props.filters})
        }
        }
      />
      : null;
    const filterPortfolio = this.state.filters.portfolio ?
      <FilterPortfolio
        portfolio={this.state.filters.portfolio || {}}
        onChange={ (portfolio) => {
          this.props.filters.portfolio = portfolio;
          this.setState({filters: this.props.filters})
        }
        }
      />
      : null;

    return (
      <div className={layout.filters}>
        {filterIndustry}
        {filterRatingOutlook}
        {filterCountry}
        {filterCurrency}
        {filterSector}
        {filterLiquidity}
        {filterType}
        {filterRange}
        {filterPortfolio}
      </div>
    );
  }
}

UIFilters.propTypes = {
  ee: React.PropTypes.object,
  filters: React.PropTypes.object.isRequired,
  onStateChange: React.PropTypes.func.isRequired
};

export default UIFilters;
