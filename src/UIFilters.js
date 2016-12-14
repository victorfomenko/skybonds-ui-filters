import React, { Component } from 'react';
import FilterIndustry from './components/FilterIndustry'
import FilterRatingOutlook from './components/FilterRatingOutlook'
import FilterCountry from './components/FilterCountry'
import FilterCurrency from './components/FilterCurrency'
import FilterSector from './components/FilterSector'
import FilterLiquidity from './components/FilterLiquidity'
import FilterType from './components/FilterType'
import FilterPortfolio from './components/FilterPortfolio'


class UIFilters extends Component {

  constructor(props) {
    super(props);
    this.state = {
      filters: this.props.filters || {}
    }
  }

  _getStateObj () {
    var selected = {};
    for(const key in this.state.filters){
      var activeValues = [];
      if(Object.prototype.toString.call(this.state.filters[key].values) === '[object Array]' ) {
        this.state.filters[key].values.forEach( (value) => {
          if(value.selected){
            activeValues.push(value);
          }
        });
      }
      if(activeValues.length > 0) {
        selected[key] = activeValues;
      }
    }


    return {
      all: this.state.filters,
      selected
    }
  }


  _onChange () {
    this.setState(this._getStateObj());
  }


  componentDidUpdate(){
    this.props.onStateChange(this._getStateObj());
  }

  resetFilterState(){
    var selected = {};
    for(const key in this.state.filters){
      var activeValues = [];
      if(Object.prototype.toString.call(this.state.filters[key].values) === '[object Array]' ) {
        this.state.filters[key].values.forEach( (value) => {
          if(value.selected){
            value.selected = false
            activeValues.push(value);
          }
        });
      }
      if(activeValues.length > 0) {
        selected[key] = activeValues;
      }
    }
    this.setState({
      all: this.state.filters,
      selected
    });
  }


  render(){
    return (
      <div className="filters">
        <FilterIndustry
          industry={this.state.filters.industry || {}}
          onChange={value => {
              this.props.filters.industry = value;
              this.setState({filters: this.props.filters})
            }
          }
        />
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
        <FilterCountry
          country={this.state.filters.country || {}}
          onChange={ (country) => {
              this.props.filters.country = country;
              this.setState({filters: this.props.filters})
            }
          }
        />
        <FilterCurrency
          currency={this.state.filters.currency || {}}
          onChange={ (currency) => {
              this.props.filters.currency = currency;
              this.setState({filters: this.props.filters})
            }
          }
        />
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
        <FilterLiquidity
          liquidity={this.state.filters.liquidity || {}}
          onChange={ (currency) => {
              this.props.filters.liquidity = currency;
              this.setState({filters: this.props.filters})
            }
          }
        />
        <FilterType
          type={this.state.filters.type || {}}
          onChange={ (currency) => {
              this.props.filters.type = currency;
              this.setState({filters: this.props.filters})
            }
          }
        />
        <FilterPortfolio
          portfolio={this.state.filters.portfolio || {}}
          onChange={ (portfolio) => {
              this.props.filters.portfolio = portfolio;
              this.setState({filters: this.props.filters})
            }
          }
        />
        <div className="close_icon">
          <a href="javascript:void(0)" onClick={this.resetFilterState.bind(this)}>✕</a>
        </div>
      </div>
    );
  }
}

UIFilters.propTypes = {
  filters: React.PropTypes.object.isRequired,
  onStateChange: React.PropTypes.func.isRequired
};

module.exports = UIFilters;
