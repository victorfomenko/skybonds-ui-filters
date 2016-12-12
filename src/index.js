import { AppContainer } from 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import UIFilters from './UIFilters';
require('../vendors.css');
require('../main.css');
require('./style/layout.sass');
require('./style/filter.sass');

const rootEl = document.getElementById('root');
const state = {
  filters: {
    currency: {
      values: [
        {name:'ITL'},
        {name:'NZD'},
        {name:'HUF'},
        {name:'ILS', selected: true},
        {name:'CLP'},
        {name:'ZAR'},
        {name:'CRC'},
        {name:'JMD'},
        {name:'TRY', disabled: true},
        {name:'KZT'},
        {name:'DOP'},
        {name:'COP'},
        {name:'CAD'},
        {name:'KRW'},
        {name:'GBP'},
        {name:'DKK'},{name:'PLN'},{name:'CNY'},{name:'DEM'},{name:'RON'},{name:'CHF'},{name:'SAR'},{name:'JPY'},{name:'IDR'},{name:'SEK'},{name:'USD'},{name:'MXN'},{name:'ZMW'},{name:'SGD'},{name:'CZK'},{name:'NOK'},{name:'PEN'},{name:'NGN'},{name:'UAH'},{name:'NAD'},{name:'GEL'},{name:'GHS'},{name:'INR'},{name:'AUD'},{name:'EUR'},{name:'BRL'},{name:'HKD'},{name:'MYR'},{name:'RUB'}],
      sortStrategy: function (a, b) {
        var map = {};
        var order = [
          'RUB',
          'USD',
          'EUR'
        ];

        order.forEach((value, index) => {
          map[value] = order.length - index
        });

        order = map;

        const nameA = String(a.name).toUpperCase();
        const nameB = String(b.name).toUpperCase();
        const aWeight = order[nameA] ? order[nameA] : 0;
        const bWeight = order[nameB] ? order[nameB] : 0;
        if (aWeight > bWeight){return -1}
        if (aWeight < bWeight){return 1}
        if (nameA < nameB){return -1}
        if (nameA > nameB){return 1}
        return 0
      }
    },
    rating: {
      values: [
        {
          name: 'CCC',
          selected: true
        },
        {
          name: 'B+'
        },
        {
          name: 'A-'
        },
        {
          name: 'AA-'
        },
      ]
    },
    outlook: {
      values: [
        {
          name: 'na'
        },
        {
          name: 'negative'
        },
        {
          name: 'stable',
          selected: true
        },
        {
          name: 'positive',
          disabled: true
        },
      ]
    },
    country: {
      values: [
        {
          name: 'USA',
          selected: true
        },
        {
          name: 'RUS'
        },
        {
          name: 'GBR',
          selected: true
        }
      ]
    },
    industry: {
      values:[
        {
          name: 'Oil and Gas'
        },
        {
          name: 'Construction and development'
        },
        {
          name: 'Power'
        },
        {
          name: 'Auto/Truck mfrs'
        },
        {
          name: 'Municipal',
          disabled: true
        }
      ]
    },
    domInt: {
      values: [
        {
          name: 'Domestic'
        },
        {
          name: 'International'
        }
      ]
    },
    corporations: {
      values: [
        {
          name: 'Corporations'
        },
        {
          name: 'Non-corporations'
        }
      ]
    },
    financial: {
      values: [
        {
          name: 'Financial'
        },
        {
          name: 'Non-financial'
        }
      ]
    },
    government: {
      values: [
        {
          name: 'Government'
        },
        {
          name: 'Non-government'
        }
      ]
    },
    liquidity: {
      values: [
        {name: 'Non liquid'},
        {name: 'Low liquidity'},
        {name: 'Average liquidity'},
        {name: 'High liquidity'},
        {name: 'Very high liquidity'}
      ]
    },
    type: {
      values: [
        {name: 'Regular'},
        {name: 'Subordinated'},
        {name: 'Floater'},
        {name: 'Convertible'}
      ]
    },
    duration: {
      from: '',
      to: ''
    }
  }
};
ReactDOM.render(
  <AppContainer>
    <UIFilters filters={state.filters} onStateChange={(state) => {console.log(state)} } />
  </AppContainer>,
  rootEl
);

if (module.hot) {
  module.hot.accept('./UIFilters', () => {
    // If you use Webpack 2 in ES modules mode, you can
    // use <App /> here rather than require() a <NextApp />.
    const NextApp = require('./UIFilters').default;
    ReactDOM.render(
      <AppContainer>
         <NextApp filters={state.filters} onStateChange={(state) => {console.log(state)} } />
      </AppContainer>,
      rootEl
    );
  });
}