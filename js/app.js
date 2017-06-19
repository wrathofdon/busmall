'use strict';

var products = []
var previous_ids = []
var current_ids = []
var clicks = 0

var Product = function(filename) {
  this.url = 'images/' + filename;
  this.clicks = 0;
  this.shown = 0;
  products.push(this)
};

// construct objects from filenames

// generate three random ids from products
// for each id, render image with a unique ID and add 1 to product.shown
// if result is listed in previous_ids or current_ids, pick something else
// when item is clicked, grab id.  Add 1 to product.clicks
// Add 1 to global clicks
// previous_ids = current ids
// current_ids = []
// repeat until clicks = 25
// cycle through product list, print results
