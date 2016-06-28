"use strict";

var React = require('react');
var Router = require('react-router');
var Link = require('react-router').Link;
var CourseStore = require('../../stores/courseStore');
var CourseActions = require('../../actions/courseActions');
var CourseList = require('./courseList');

var CoursePage = React.createClass({
	getInitialState: function () {

		var categoryId = this.props.params.categoryId;
		var authorId = this.props.params.authorId;

		if (categoryId) {
			return {
				courses: CourseStore.getAllCoursesByCategory(parseInt(categoryId))
			};
		} else if (authorId) {
			return {
				courses: CourseStore.getAllCoursesByAuthor(parseInt(authorId))
			};
		} else {
			return {
				courses: CourseStore.getAllCourses()
			};
		}


	},

	componentWillMount: function () {
		CourseStore.addChangeListener(this._onChange);
	},

	//Clean up when this component is unmounted
	componentWillUnmount: function () {
		CourseStore.removeChangeListener(this._onChange);
	},

	_onChange: function () {
		this.setState({ courses: CourseStore.getAllCourses() });
	},

	render: function () {
		return (
			<div>
                <div className="jumbotron">
                    <h1>Courses</h1>
                    <p>This are the courses we have.</p>
                    <Link to="addCourse" className="btn btn-primary btn-sm">Add Course</Link>
                </div>
                <CourseList courses={this.state.courses} />
            </div>
		);
	}
});

module.exports = CoursePage;