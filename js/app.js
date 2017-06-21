'use strict';

// array of objects
var products = [];
var chartData = [[], [], [], [], []];
// prevents excessive repetition
var restricted = [null, null, null, null, null, null];
// number of clicks so far
var counter = 0;
var limit = 25;
var i;
var storage;
var toStore;
var display = document.getElementById('display');
var heading = document.getElementById('heading');
var filenames = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'usb.gif', 'water-can.jpg', 'wine-glass.jpg'];

var Product = function(filename) {
  // generates new object from filename and pushes to an array
  this.name = filename.slice(0, filename.indexOf('.'));
  this.url = 'img/' + filename;
  this.clicks = 0;
  storage = localStorage.getItem(this.name);
  if (storage) {
    storage = storage.split(',');
    this.clicks = parseInt(storage[0]);
    this.shown = parseInt(storage[1]);
  } else {
    this.shown = 0;
    this.pvalue = 0;
  }
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
  for (i = 3; i < 6; i++) {
    toStore = products[restricted[i]];
    localStorage.setItem(toStore.name, toStore.clicks + ',' + toStore.shown);
  }
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
    while (restricted.indexOf(key) > - 1) {
      key = Math.floor(Math.random() * filenames.length);
    }
    // add current key to restricted list and render new image
    restricted.push(key);
    render(key);

  }}


function generateRGB() {
  // generates random color
  var r = Math.floor(Math.random() * 256);
  var g = Math.floor(Math.random() * 246);
  var b = Math.floor(Math.random() * 246);
  if (r == g || g == b || r == b) {
    return(generateRGB());
  } else {
    return('rgb(' + r + ', ' + g + ', ' + b + ')');
  }}


function results() {
  display.innerHTML = '';
  heading.innerHTML = 'Results:';
  for (i = 0; i < products.length; i++) {
    chartData[0].push(products[i].name + ' (' + products[i].clicks + '/' + products[i].shown + ')');
    chartData[1].push(products[i].clicks);
    chartData[2].push(products[i].shown);
    var diff = (products[i].clicks / products[i].shown) - .333;
    var zscore = diff / (0.471 / Math.sqrt(products[i].shown));
    var pvalue = getZPercent(zscore);
    chartData[3].push((pvalue * 100).toFixed(1));
    chartData[4].push(generateRGB());}
  console.log(chartData);
  var ctx = document.getElementById('myChart').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: chartData[0],
      datasets: [{
        label: 'Percentile',
        data: chartData[3],
        backgroundColor: chartData[4],
        borderColor: chartData[4],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero:true
          }
        }]
      }
    }
  });
}

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
