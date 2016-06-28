"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../constants/actionTypes');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var _ = require('lodash');
var CHANGE_EVENT = 'change';

var _categories = [];

var CategoryStore = assign({}, EventEmitter.prototype, {
	addChangeListener: function(callback) {
		this.on(CHANGE_EVENT, callback);
	},

	removeChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	},

	emitChange: function() {
		this.emit(CHANGE_EVENT);
	},

	getAllCategories: function() {
		return _categories;
	},

	getCategoryById: function(id) {
		var _category = _.find(_categories, { id: parseInt(id) });

		return _category;
	}
});

Dispatcher.register(function(action) {
	switch(action.actionType) {
		case ActionTypes.INITIALIZE:
			_categories = action.initialData.categories;
			CategoryStore.emitChange();
			break;
		case ActionTypes.CREATE_CATEGORY:
			_categories.push(action.category);
			CategoryStore.emitChange();
			break;
		case ActionTypes.UPDATE_CATEGORY:
			var existingCategory = _.find(_categories, {id: action.category.id});
			var existingCategoryIndex = _.indexOf(_categories, existingCategory); 
			_categories.splice(existingCategoryIndex, 1, action.category);
			CategoryStore.emitChange();
			break;
		case ActionTypes.DELETE_CATEGORY:
			_.remove(_categories, function(category) {
				return action.id === category.id;
			});
			CategoryStore.emitChange();
			break;
		case ActionTypes.ERROR_CATEGORY_USING:
			CategoryStore.emitChange();
			break;
		default:
			// no op
	}
});

module.exports = CategoryStore;