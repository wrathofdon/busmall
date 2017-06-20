'use strict';

var products = [];
var restricted = [null, null, null, null, null, null];
var counter = 0;
var limit = 25;
var temp;
var i;
var display = document.getElementById('display');
var heading = document.getElementById('heading');
var filenames = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'usb.gif', 'water-can.jpg', 'wine-glass.jpg'];

var Product = function(filename) {
  this.url = 'img/' + filename;
  this.clicks = 0;
  this.shown = 0;
  products.push(this);
};

for (var i = 0; i < filenames.length; i++) {
  temp = new Product(filenames[i]);
}

function render(key) {
  console.log(products[key].url, i);
  var img = document.createElement('img');
  products[key].shown += 1;
  img.setAttribute('src', products[key].url);
  img.setAttribute('id', key);
  img.setAttribute('width', "30%");
  display.append(img);
  // render new graphic based on location in products array and position on page
}

function choices() {
  display.innerHTML = '';
  restricted = restricted.slice(3);
  var key = restricted[0];
  for (i = 0; i < 3; i++) {
    while (restricted.indexOf(key) > -1) {
      key = Math.floor(Math.random() * filenames.length);
    }
    restricted.push(key);
    render(key);
  }
}

choices();

function generateRGB() {
  var r = Math.floor(Math.random() * 256);
  var g = Math.floor(Math.random() * 256);
  var b = Math.floor(Math.random() * 256);
  if (r == g || g == b || r == b) {
    return(generateRGB());
  } else {
    return('rgb(' + r + ', ' + g + ', ' + b + ')');
  }
}

function results() {

}

display.addEventListener('click', function (event) {
  var answer = event.target.getAttribute('id');
  console.log(products[answer]);
  products[answer].clicks += 1;
  counter += 1;
  // heading.style.color = generateRGB();
  choices();
  document.getElementById('heading').style.color = generateRGB();
  if counter
});
