"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var CourseActions = require('../../actions/courseActions');
var toastr = require('toastr');

var CourseList = React.createClass({
	propTypes: {
		courses: React.PropTypes.array.isRequired
	},

	deleteCourse: function (id, event) {
		event.preventDefault();
		CourseActions.deleteCourse(id);
		toastr.success('Course Deleted');
	},

	render: function () {
		var createCourseRow = function (course) {
			// debugger;
			var _created = new Date(course.created).toDateString();
			var _updated = course.updated !== undefined ? new Date(course.updated).toDateString() : "-";
			return (
				<tr key={course.id}>
					<td><Link to="manageCourse" params={{ id: course.id }}>{course.title}</Link></td>
					<td><Link to="manageAuthor" params={{ id: course.authorId, origin: 'courses' }}>{course.author}</Link></td>
					<td><Link to="manageCategory" params={{ id: course.categoryId, origin: 'courses' }}>{course.category}</Link></td>
					<td>{course.length}</td>
					<td>{_created}</td>
					<td>{_updated}</td>
					<td><a href="#" onClick={this.deleteCourse.bind(this, course.id) }>Delete</a></td>
				</tr>
			);
		};

		return (
			<div>
				<table className="table">
					<thead>
						<th>Title</th>
						<th>Author</th>
						<th>Category</th>
						<th>Length</th>
						<th>Created</th>
						<th>Updated</th>
						<th></th>
					</thead>
					<tbody>
						{this.props.courses.map(createCourseRow, this) }
					</tbody>
				</table>
			</div>
		);
	}
});

module.exports = CourseList;