"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var CategoryApi = require('../api/categoryApi');
var CourseApi = require('../api/courseApi');
var ActionTypes = require('../constants/actionTypes');

var CategoryActions = {
	createCategory: function (category) {
		var newCategory = CategoryApi.saveCategory(category);

		newCategory.created = new Date();

		//Hey dispatcher, go tell all the stores that an category was just created.
		Dispatcher.dispatch({
			actionType: ActionTypes.CREATE_CATEGORY,
			category: newCategory
		});
	},

	updateCategory: function (category) {
		var updatedCategory = CategoryApi.saveCategory(category);

		updatedCategory.updated = new Date();

		Dispatcher.dispatch({
			actionType: ActionTypes.UPDATE_CATEGORY,
			category: updatedCategory
		});
	},

	deleteCategory: function (id) {
		var _exist = CourseApi.hasCourseWithThisCategory(id);

		if (_exist === false) {
			CategoryApi.deleteCategory(id);

			Dispatcher.dispatch({
				actionType: ActionTypes.DELETE_CATEGORY,
				id: id
			});

			return true;
		} else {
			return false;
		}
	}
};

module.exports = CategoryActions;