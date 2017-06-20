'use strict';

// array of objects
var products = [];
// prevents excessive repetition
var restricted = [null, null, null, null, null, null];
// number of clicks so far
var counter = 0;
var limit = 25;
var i;
var display = document.getElementById('display');
var heading = document.getElementById('heading');
var thead = document.getElementById('thead');
var tbody = document.getElementById('tbody');
var filenames = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'usb.gif', 'water-can.jpg', 'wine-glass.jpg'];

var Product = function(filename) {
  // generates new object from filename and pushes to an array
  this.name = filename.slice(0, filename.indexOf('.'));
  this.url = 'img/' + filename;
  this.clicks = 0;
  this.shown = 0;
  products.push(this);};

for (i = 0; i < filenames.length; i++) {
  // converts all file names into objects, accessible via array index
  var temp = new Product(filenames[i]);}

//presents first set of choices
choices();

display.addEventListener('click', function (event) {
  var answer = event.target.getAttribute('id');
  products[answer].clicks += 1;
  counter += 1;
  // resets options
  choices();
  // subtle way to let user know that something has changed
  document.getElementById('heading').style.color = generateRGB();
  if (counter >= limit) {
    results();
  }
});


function render(key) {
  // presents graphic based on key index
  var img = document.createElement('img');
  products[key].shown += 1;
  img.setAttribute('src', products[key].url);
  img.setAttribute('id', key);
  img.setAttribute('width', '30%');
  img.setAttribute('title', products[key].name);
  img.setAttribute('alt', products[key].name);
  display.append(img);}


function choices() {
  // generates three choices
  display.innerHTML = '';
  // restricted list removes entries older than one round
  restricted = restricted.slice(3);
  // guarantees that key will fail on first try
  var key = restricted[0];
  for (i = 0; i < 3; i++) {
    // if key has recently been chosen, pick again
    while (restricted.indexOf(key) > -1) {
      key = Math.floor(Math.random() * filenames.length);
    }
    // add current key to restricted list and render new image
    restricted.push(key);
    render(key);
  }}


function generateRGB() {
  // generates random color
  var r = Math.floor(Math.random() * 256);
  var g = Math.floor(Math.random() * 256);
  var b = Math.floor(Math.random() * 256);
  if (r == g || g == b || r == b) {
    return(generateRGB());
  } else {
    return('rgb(' + r + ', ' + g + ', ' + b + ')');
  }}


function results() {
  //generate results
  display.innerHTML = '';
  heading.innerHTML = 'Results:';
  var row = document.createElement('tr');
  // percentile is more useful than percent
  var topRow = ['Image:', 'Appearences:', 'Clicks:', 'Percentile:'];
  for (i = 0; i < 4; i++) {
    var cell = document.createElement('th');
    cell.textContent = topRow[i];
    row.append(cell);
  }
  thead.append(row);
  for (i = 0; i < products.length; i++) {
    row = document.createElement('tr');
    cell = document.createElement('th');
    var img = document.createElement('img');
    img.setAttribute('src', products[i].url);
    img.setAttribute('width', '50%');
    cell.append(img);
    row.append(cell);
    cell = document.createElement('th');
    cell.textContent = products[i].shown;
    row.append(cell);
    cell = document.createElement('th');
    cell.textContent = products[i].clicks;
    row.append(cell);
    var diff = (products[i].clicks / products[i].shown) - .333;
    console.log(i, diff);
    var zscore = diff / (0.471 / Math.sqrt(products[i].shown));
    var pvalue = getZPercent(zscore);
    console.log(zscore);
    console.log(Math.round(3.434234324, 2));
    cell = document.createElement('th');
    cell.textContent = Math.floor(pvalue * 100) + '%'
    cell.setAttribute('style', 'background-color: rgba(0, 102, 30, ' + pvalue + ')');
    row.append(cell);
    tbody.append(row);
  }
}

//source: https://stackoverflow.com/questions/16194730/seeking-a-statistical-javascript-function-to-return-p-value-from-a-z-score

function getZPercent(z) {
    //z == number of standard deviations from the mean

    //if z is greater than 6.5 standard deviations from the mean
    //the number of significant digits will be outside of a reasonable
    //range
  if ( z < -6.5)
    return 0.0;
  if( z > 6.5)
    return 1.0;

  var factK = 1;
  var sum = 0;
  var term = 1;
  var k = 0;
  var loopStop = Math.exp(-23);
  while(Math.abs(term) > loopStop){
    term = .3989422804 * Math.pow(-1,k) * Math.pow(z,k) / (2 * k + 1) / Math.pow(2,k) * Math.pow(z, k + 1) / factK;
    sum += term;
    k++;
    factK *= k;}
  sum += 0.5;
  return sum;
};
