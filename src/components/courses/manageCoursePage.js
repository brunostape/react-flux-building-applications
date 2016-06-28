"use strict";

var React = require('react');
var Router = require('react-router');
var Link = require('react-router').Link;
var CourseForm = require('./courseForm');
var CourseActions = require('../../actions/courseActions');
var CourseStore = require('../../stores/courseStore');
var AuthorStore = require('../../stores/authorStore');
var CategoryStore = require('../../stores/categoryStore');
var toastr = require('toastr');

var ManageCoursePage = React.createClass({
	mixins: [
		Router.Navigation
	],

	statics: {
		willTransitionFrom: function (transition, component) {
			if (component.state.dirty && !confirm('Leave without saving?')) {
				transition.abort();
			}
		}
	},

	getInitialState: function () {
		return {
			course: { id: 0, title: '', authorId: 0, author: '', categoryId: 0, category: '', length: '' },
			authors: AuthorStore.getAllAuthors(),
			categories: CategoryStore.getAllCategories(),
			errors: {},
			dirty: false
		};
	},

	componentWillMount: function () {
		var courseId = this.props.params.id; //from the path '/course:id'
		if (courseId) {
			this.setState({ course: CourseStore.getCourseById(courseId) });
		}
	},

	setCourseState: function (event) {
		this.setState({ dirty: true });

		var field = event.target.name;
		var value = event.target.value;
		var type = event.target.type;

		if (type === 'select-one') {
			this.state.course[field] = parseInt(value);
		} else {
			this.state.course[field] = value;
		}

		return this.setState({ course: this.state.course });
	},

	courseFormIsValid: function () {
		var formIsValid = true;
		this.state.errors = {}; //clear any previous errors.

		if (this.state.course.title.length < 3) {
			this.state.errors.title = 'Title must be at least 3 characters.';
			formIsValid = false;
		}

		if (this.state.course.authorId.length <= 0) {
			this.state.errors.authorId = 'Author must be informed.';
			formIsValid = false;
		}

		if (this.state.course.categoryId.length <= 0) {
			this.state.errors.categoryId = 'Category must be informed.';
			formIsValid = false;
		}

		if (this.state.course.length.length < 3) {
			this.state.errors.length = 'Length must be at least 3 characters.';
			formIsValid = false;
		}

		this.setState({ errors: this.state.errors });
		return formIsValid;
	},

	saveCourse: function (event) {
		event.preventDefault();

		if (!this.courseFormIsValid()) {
			return;
		}

		if (this.state.course.id) {
			CourseActions.updateCourse(this.state.course);
		} else {
			CourseActions.createCourse(this.state.course);
		}

		this.setState({ dirty: false });
		toastr.success('Course saved.');
		this.transitionTo('courses');
	},

	render: function () {
		return (
			<div>
                <div className="jumbotron">
                    <h1>Manage Course</h1>
                    <p>Here is where you add news courses.</p>
                    <Link to="courses" className="btn btn-primary btn-sm">All Courses</Link>
                </div>
                <CourseForm
                    course={this.state.course}
                    authors={this.state.authors}
                    categories={this.state.categories}
                    onChange={this.setCourseState}
                    onSave={this.saveCourse}
                    errors={this.state.errors} />
            </div>
		);
	}
});

module.exports = ManageCoursePage;