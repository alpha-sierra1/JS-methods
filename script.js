'use strict';

const bookings = [];

const createBooking = function (
  flighNum,
  numPassengers = 1,
  price = 199 * numPassengers
) {
  const booking = {
    flighNum,
    numPassengers,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};

createBooking('LH123');
createBooking('LH123', 2, 800);
createBooking('LH123', 2);
createBooking('LH123', 5);

const flight = 'LH234';
const aditi = {
  name: 'Aditi Singh',
  passport: 2434505035593,
};

const checkIn = function (flightNum, passenger) {
  flightNum = 'LH999';
  passenger.name = 'Ms. ' + passenger.name;

  if (passenger.passport === 2434505035593) {
    alert('Check in');
  } else {
    alert('Wrong passport');
  }
};

checkIn(flight, aditi);
console.log(flight);
console.log(aditi);

const oneWord = function (str) {
  return str.replace(/ /g, '').toLowerCase();
};

const upperFirstWord = function (str) {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
};

// Higher-order function
const transformer = function (str, fn) {
  console.log(`Original string: ${str}`);
  console.log(`Transformed string: ${fn(str)}`);

  console.log(`Transformed by: ${fn.name}`);
};

transformer('Javascript is the best', upperFirstWord);

// functions calling functions

const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};

const greeterHey = greet('Hey');
greeterHey('Aditi');
greeterHey('Harshita');

// Challenge (same above function as arrow function)
const greetArr = greeting => name => console.log(`${greeting} ${name}`);

greetArr('Hi')('Aditi');

// The call and apply methods

const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  // book function()  {}
  book(flighNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode} ${flighNum}`
    );
    this.bookings.push({ flight: `${this.iataCode} ${flighNum}, name` });
  },
};
lufthansa.book(239, 'Aditi Singh');
lufthansa.book(635, 'Harshita Mathur');
console.log(lufthansa);

const eurowings = {
  airline: 'Eurowings',
  iataCode: 'Ew',
  bookings: [],
};
const book = lufthansa.book;

// Doesnt work
// book(23, 'Sarah Williams');

// CALL METHOD

book.call(eurowings, 23, 'Aditi');
console.log(eurowings);

book.call(lufthansa, 238, 'Lol');

const swiss = {
  airline: 'Swiss Air lines',
  iataCode: 'LX',
  bookings: [],
};
book.call(swiss, 44, 'Adi');

// APPLY METHOD (apply method takes arrays as arguments)

const flightData = [583, 'Sakshi Jain'];
book.apply(swiss, flightData);
console.log(swiss);

book.call(swiss, ...flightData);

// Bind Method

const bookEW = book.bind(eurowings);
const bookLH = book.bind(lufthansa);
const bookLX = book.bind(swiss);

bookEW(23, 'Laveena');

const bookEW23 = book.bind(eurowings, 23);
bookEW23('Aditi Singh');
bookEW23('Harshi');

// With Event Listeners
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log(this);

  this.planes++;
  console.log(this.planes);
};

document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

// partial application

const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

const addVAT = addTax.bind(null, 0.23);
// const addTax = (rate, value) => value + value * 0.23;

console.log(addVAT(100));
console.log(addVAT(332));

// Above example through 'function calling function'
const addTax1 = function (rate) {
  return function (value) {
    console.log(`${rate} + ${rate} * ${value}`);
  };
};
const calculator = addTax1(0.23);

calculator(200);
console.log(calculator);

// CLOSURES

const secureBooking = function () {
  let passengerCount = 0;

  return function () {
    passengerCount++;
    console.log(`${passengerCount} passengers`);
  };
};
const booker = secureBooking();

booker();
booker();
booker();

// Closure examples

// example 1
let f;
const g = function () {
  const a = 23;
  f = function () {
    console.log(a * 2);
  };
};

const h = function () {
  const b = 777;
  f = function () {
    console.log(b * 2);
  };
};

g();
f();
console.dir(f);

// re-assigning f function
h();
f();
console.dir(f);

// example 2
const boardPassengers = function (n, wait) {
  const perGroup = n / 3;

  setTimeout(function () {
    console.log(`We are now boarding all ${n} passengers`);
    console.log(`There are 3 groups, each with ${perGroup} passengers`);
  }, wait * 1000);

  console.log(`Will start boarding in ${wait} seconds`);
};

boardPassengers(180, 3);
