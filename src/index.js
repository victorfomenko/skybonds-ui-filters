import { AppContainer } from 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import UIFilters from './UIFilters';
require('../node_modules/@skybonds/ui-styles/style.css');
require('./style/layout.sass');
require('./style/filter.sass');

//Added for loader testing. Please remove before publishing into skybonds-ui project to avoid redundancy
require('./style/loading-cover.sass');

const rootEl = document.getElementById('root');
var state = {
  filters: {
    currency: {
      values: [
        {name:'ITL'},
        {name:'NZD'},
        {name:'HUF'},
        {name:'ILS', selected: true, tag: '123'},
        {name:'CLP'},
        {name:'ZAR'},
        {name:'CRC'},
        {name:'JMD'},
        {name:'TRY', disabled: true},
        {name:'KZT', tag: '1123235'},
        {name:'DOP', tag: '1235', selected: true},
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
          selected: true,
          color: '#ffd400'
        },
        {
          name: 'CCC+',
          selected: true,
          color: '#ffd400'
        },
        {
          name: 'CCC-',
          selected: true,
          color: '#ffd400',
          disabled: true
        },
        {
          name: 'B+',
          color: '#ff6e7e',
          tag: '1235',
          disabled: true
        },
        {
          name: 'B-',
          color: '#ff6e7e',
          tag: '1123235',
          disabled: true
        },
        {
          name: 'A-',
          color: '#a800cc'
        },
        {
          name: 'A',
          color: '#a800cc'
        },
        {
          name: 'AA-',
          color: '#ef7c00'
        },
      ],
      sortStrategy: function (a, b) {
        var ratings = {
          'AAA': {color: '#72ceff', group: 'AAA', synonym: 'Aaa', order: 100},
          'AA+': {color: '#ef7c00', group: 'AA', synonym: 'Aa1', order: 96},
          'AA': {color: '#ef7c00', group: 'AA', synonym: 'Aa2', order: 95},
          'AA-': {color: '#ef7c00', group: 'AA', synonym: 'Aa3', order: 94},
          'A+': {color: '#a800cc', group: 'A', synonym: 'A1', order: 91},
          'A': {color: '#a800cc', group: 'A', synonym: 'A2', order: 90},
          'A-': {color: '#a800cc', group: 'A', synonym: 'A3', order: 89},
          'BBB+': {color: '#00963f', group: 'BBB', synonym: 'Baa1', order: 86},
          'BBB': {color: '#00963f', group: 'BBB', synonym: 'Baa2', order: 85},
          'BBB-': {color: '#00963f', group: 'BBB', synonym: 'Baa3', order: 84},
          'BB+': {color: '#47599d', group: 'BB', synonym: 'Ba1', order: 81},
          'BB': {color: '#47599d', group: 'BB', synonym: 'Ba2', order: 80},
          'BB-': {color: '#47599d', group: 'BB', synonym: 'Ba3', order: 79},
          'B+': {color: '#ff6e7e', group: 'B', synonym: 'B1', order: 76},
          'B': {color: '#ff6e7e', group: 'B', synonym: 'B2', order: 75},
          'B-': {color: '#ff6e7e', group: 'B', synonym: 'B3', order: 74},
          'CCC+': {color: '#ffd400', group: 'CCC', synonym: 'Caa1', order: 71},
          'CCC': {color: '#ffd400', group: 'CCC', synonym: 'Caa2', order: 70},
          'CCC-': {color: '#ffd400', group: 'CCC', synonym: 'Caa3', order: 69},
          'CC': {color: '#af6725', group: 'CC', synonym: 'Ca', order: 65},
          'C': {color: '#b04127', group: 'C', synonym: 'C', order: 60},
          'D': {color: '#808080', group: 'D', synonym: 'D', order: 57},
          'NR': {color: '#cbcbcb', group: 'NR', synonym: 'NR', order: 55}
        };

        var getOrder = (rating)=> {
          return ratings[rating].order
        };

        var result = getOrder(a.name);
        if (result == null) {result = 0};
        var result1 = getOrder(b.name);
        if (result1 == null) {result1 = 0};
        return result1 - result;
      }
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
          name: 'Construction and development',
          disabled: true
        },
        {
          name: 'Power',
          disabled: true
        },
        {
          name: 'Auto/Truck mfrs',
          disabled: true
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
          name: 'domestic',
          tag: '1'
        },
        {
          name: 'international'
        }
      ]
    },
    corporations: {
      values: [
        {
          name: 'corporations'
        },
        {
          name: 'non-corporations'
        }
      ]
    },
    financial: {
      values: [
        {
          name: 'financial'
        },
        {
          name: 'non-financial'
        }
      ]
    },
    government: {
      values: [
        {
          name: 'true'
        },
        {
          name: 'false'
        }
      ]
    },
    liquidity: {
      values: [
        {name: 'non-liquid'},
        {name: 'low'},
        {name: 'average'},
        {name: 'high'},
        {name: 'very high'}
      ]
    },
    type: {
      values: [
        {name: 'regular'},
        {name: 'subord'},
        {name: 'floater'},
        {name: 'convertible'}
      ]
    },
    range: {
      values: [
        {name: 'price', values:['0', '0.235'], defaultValues:['1', '100']},
        {name: 'spread', values:['-Infinity', '56'], defaultValues:['-842.73','3257163902.44']},
        {name: 'yield', values:[], defaultValues:['-60.03','7.743331102333809e+43']},
        {name: 'duration', values:[], defaultValues:['1','2']},
        {name: 'maturity', values:['2', 'Infinity'], defaultValues:['0.002739726', '34.1123287671']},
        {name: 'discount', values:[], defaultValues:[]}
      ],
      sortStrategy: (a,b) => {
        var order;
        a = (String(a.name)).toUpperCase();
        b = (String(b.name)).toUpperCase();
        order = {
          'YIELD': 100,
          'PRICE': 90,
          'SPREAD': 80,
          'DURATION': 70,
          'MATURITY': 60,
          'DISCOUNT': 50,
        };
        if (order[a] > order[b]) {
          return -1;
        }
        if (order[a] < order[b]) {
          return 1;
        }
        return 0;
      }
    },
    portfolio: {
      values: [
        {name: 'Portfolio', selected: true},
      ]
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
