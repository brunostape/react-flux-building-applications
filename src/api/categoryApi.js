"use strict";

//This file is mocking a web API by hitting hard coded data.
var categories = require('./categoryData').categories;
var _ = require('lodash');

//This would be performed on the server in a real app. Just stubbing in.
var _generateId = function() {
	return new Date().getTime();
};

var _clone = function(item) {
	return JSON.parse(JSON.stringify(item)); //return cloned copy so that the item is passed by value instead of by reference
};

var CategoryApi = {
	getAllCategories: function() {
		return _clone(categories); 
	},

	getCategoryById: function(id) {
		var category = _.find(categories, {id: id});
		return _clone(category);
	},
	
	saveCategory: function(category) {
		//pretend an ajax call to web api is made here
		console.log('Pretend this just saved the category to the DB via AJAX call...');
		
		if (category.id) {
			var existingCategoryIndex = _.indexOf(categories, _.find(categories, {id: category.id})); 
			categories.splice(existingCategoryIndex, 1, category);
		} else {
			//Just simulating creation here.
			//The server would generate ids for new categories in a real app.
			//Cloning so copy returned is passed by value rather than by reference.
			category.id = _generateId();
			categories.push(category);
		}

		return _clone(category);
	},

	deleteCategory: function(id) {
		console.log('Pretend this just deleted the category from the DB via an AJAX call...');
		_.remove(categories, { id: id});
	}
};

module.exports = CategoryApi;