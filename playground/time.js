// JAN 1st 1970: 00:00:00 am
const moment = require('moment');
moment.locale('pt-br'); 

//var date = new Date();
//var month = [];
//console.log(date.getMonth());

var date = moment();

date.add(100, 'year').subtract(9, 'months');
console.log(date.format());
console.log(date.format('D MMM YYYY'));
console.log(date.format('dddd, MMMM Do YYYY, h:mm:ss a'));

date.subtract(6, 'hours');
console.log(date.format('h:mm a'));
console.log(date.format('hh:mm a'));
