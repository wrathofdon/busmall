'use strict';

var products = [];
var restricted = [null, null, null, null, null, null];
var counter = 0;
var limit = 25;
var temp;
var i;
// var display = document.getElementById('display');
var filenames = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'usb.gif', 'water-can.jpg', 'wine-glass.jpg'];

var Product = function(filename) {
  this.url = 'images/' + filename;
  this.clicks = 0;
  this.shown = 0;
  products.push(this);
};

for (var i = 0; i < filenames.length; i++) {
  temp = new Product(filenames[i]);
}

function render(key, i) {
  console.log(products[key].url, i);
  // render new graphic based on location in products array and position on page
}

function choices() {
  restricted = restricted.slice();
  var key = restricted[0];
  for (i = 0; i < 3; i++) {
    while (restricted.indexOf(key) > -1) {
      key = Math.floor(Math.random() * filenames.length);
    }
    restricted.push(key);
    render(key, i);
  }
}

choices();

//
// function render(product, id) {
//   console.log(products[product].url);
//   // products[product].shown += 1;
//   // var img = document.createElement('img');
//   // img.setAttribute('src', products[product].url);
//   // img.setAttribute('id', id);
//   // display.append(img);
//   // add html to render image
// };
//
// function presentChoices() {
//   previous_ids = current_ids.slice(0);
//   current_ids = [];
//   while (current_ids.length < 3) {
//     while(!current_ids.length || current_ids.indexOf(temp) > -1 || previous_ids.indexOf(temp) > -1) {
//       temp = Math.floor(Math.random() * products.length);
//     }
//     render(temp, current_ids.length);
//     current_ids.push(temp);
//     products[temp].clicks += 1;
//   }};
//
// function showResults() {
//   //show results
// }
//
// presentChoices();
//
// // display.addEventListener('click', function (event) {
// //   var id = event.target.getAttribute('id');
// //   products[id].clicks += 1;
// //   clicks += 1;
// //   if (clicks < limit) {
// //     presentChoices();
// //   } else {
// //     showResults();
// //   };
// // });
//
// // construct objects from filenames
//
// // generate three random ids from products
// // for each id, render image with a unique ID and add 1 to product.shown
// // if result is listed in previous_ids or current_ids, pick something else
// // when item is clicked, grab id.  Add 1 to product.clicks
// // Add 1 to global clicks
// // previous_ids = current ids
// // current_ids = []
// // repeat until clicks = 25
// // cycle through product list, print results
