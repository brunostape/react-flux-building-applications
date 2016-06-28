"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../constants/actionTypes');
var AuthorApi = require('../api/authorApi');
var CourseApi = require('../api/courseApi');
var CategoryApi = require('../api/categoryApi');

var InitializeActions = {
	initApp: function() {
		Dispatcher.dispatch({
			actionType: ActionTypes.INITIALIZE,
			initialData: {
				authors: AuthorApi.getAllAuthors(),
                courses: CourseApi.getAllCourses(),
                categories: CategoryApi.getAllCategories()
			}
		});
	}
};

module.exports = InitializeActions;