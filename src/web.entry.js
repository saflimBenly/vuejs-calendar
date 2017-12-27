import './style.scss';
import moment from 'moment-timezone';
moment.tz.setDefault('UTC');

// let events = [
//   {description: 'Random event-1', date: moment('2017-12-10', 'YYYY-MM-DD')},
//   {description: 'Random event-2', date: moment('2017-12-15', 'YYYY-MM-DD')},
//   {description: 'Random event-3', date: moment('2017-12-20', 'YYYY-MM-DD')}
// ];
let events = window.__INITIAL_STATE__.map(event => {
  return {
    description: event.description,
    date: moment(event.date)
  }
});

import VueCalendar from './entry';

VueCalendar(events).$mount('#app');