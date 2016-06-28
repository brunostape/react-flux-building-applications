"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../constants/actionTypes');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var AuthorStore = require('./authorStore');
var CategoryStore = require('./categoryStore');
var _ = require('lodash');
var CHANGE_EVENT = 'change';

var _courses = [];

var CourseStore = assign({}, EventEmitter.prototype, {
	addChangeListener: function (callback) {
		this.on(CHANGE_EVENT, callback);
	},

	removeChangeListener: function (callback) {
		this.removeListener(CHANGE_EVENT, callback);
	},

	emitChange: function () {
		this.emit(CHANGE_EVENT);
	},

	getAllCoursesByAuthor: function (authorId) {
		var __courses = _.filter(_courses, function (c) {
			return c.authorId === authorId;
		});

		__courses.forEach(function (element) {
			element = this.getCourseById(element.id);
		}, this);

		return __courses;
	},

	getAllCoursesByCategory: function (categoryId) {
		var __courses = _.filter(_courses, function (c) {
			return c.categoryId === categoryId;
		});

		__courses.forEach(function (element) {
			element = this.getCourseById(element.id);
		}, this);

		return __courses;
	},

	getAllCourses: function () {

		_courses.forEach(function (element) {
			element = this.getCourseById(element.id);
		}, this);

		return _courses;
	},

	getCourseById: function (id) {
		var _course = _.find(_courses, { id: parseInt(id) });

		if (_course) {
			var _author = AuthorStore.getAuthorById(_course.authorId);

			if (_author) {
				_course.author = _author.fullName;
			} else {
				_course.author = "-";
			}

			var _category = CategoryStore.getCategoryById(_course.categoryId);

			if (_category) {
				_course.category = _category.name;
			} else {
				_course.category = "-";
			}
		}

		return _course;
	}
});

Dispatcher.register(function (action) {
	switch (action.actionType) {
		case ActionTypes.INITIALIZE:
			_courses = action.initialData.courses;
			CourseStore.emitChange();
			break;
		case ActionTypes.CREATE_COURSE:
			_courses.push(action.course);
			CourseStore.emitChange();
			break;
		case ActionTypes.UPDATE_COURSE:
			var existingCourse = _.find(_courses, { id: action.course.id });
			var existingCourseIndex = _.indexOf(_courses, existingCourse);
			_courses.splice(existingCourseIndex, 1, action.course);
			CourseStore.emitChange();
			break;
		case ActionTypes.DELETE_COURSE:
			_.remove(_courses, function (course) {
				return action.id === course.id;
			});
			CourseStore.emitChange();
			break;
		default:
		// no op
	}
});

module.exports = CourseStore;