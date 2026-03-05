import {formatCurrency} from '../scripts/utils/money.js';

console.log('test suite: formatCurrency')

//Basic test case
console.log('converts cents to dollars:');
if (formatCurrency(2095) === '20.95') {
    console.log('passed');
} else {
    console.log('fail');
}

//Edge test case
console.log('converts 0 to 0 dollars:');
if (formatCurrency(0) === '0.00') {
    console.log('passed');
} else {
    console.log('fail');
}

//Edge test case
console.log('rounds up to nearst cents');
if (formatCurrency(2000.5) === '20.01') {
    console.log('passed');
} else {
    console.log('fail');
}