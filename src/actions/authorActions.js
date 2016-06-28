"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var AuthorApi = require('../api/authorApi');
var CourseApi = require('../api/courseApi');
var ActionTypes = require('../constants/actionTypes');

var AuthorActions = {
	createAuthor: function (author) {
		var newAuthor = AuthorApi.saveAuthor(author);

		newAuthor.fullName = author.firstName + " " + author.lastName;
		newAuthor.created = new Date();
		
		//Hey dispatcher, go tell all the stores that an author was just created.
		Dispatcher.dispatch({
			actionType: ActionTypes.CREATE_AUTHOR,
			author: newAuthor
		});
	},

	updateAuthor: function (author) {
		var updatedAuthor = AuthorApi.saveAuthor(author);

		updatedAuthor.fullName = author.firstName + " " + author.lastName;
		updatedAuthor.updated = new Date();
		
		Dispatcher.dispatch({
			actionType: ActionTypes.UPDATE_AUTHOR,
			author: updatedAuthor
		});
	},

	deleteAuthor: function (id) {
		var _exist = CourseApi.hasCourseWithThisAuthor(id);

		if (_exist === false) {
			AuthorApi.deleteAuthor(id);

			Dispatcher.dispatch({
				actionType: ActionTypes.DELETE_AUTHOR,
				id: id
			});

			return true;
		} else {
			return false;
		}
	}
};

module.exports = AuthorActions;