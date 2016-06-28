"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var AuthorActions = require('../../actions/authorActions');
var toastr = require('toastr');

var AuthorList = React.createClass({
	propTypes: {
		authors: React.PropTypes.array.isRequired
	},

	deleteAuthor: function (id, event) {
		event.preventDefault();

		var _deleted = AuthorActions.deleteAuthor(id);

		if (_deleted) {
			toastr.success('Author Deleted');
		} else {
			toastr.error('This author can\'t be deleted.');
		}
	},

	render: function () {
		var createAuthorRow = function (author) {
			var _created = new Date(author.created).toDateString();
			var _updated = author.updated !== undefined ? new Date(author.updated).toDateString() : "-";

			return (

				<tr key={author.id}>
					<td><Link to="manageAuthor" params={{ id: author.id }}>{author.fullName}</Link></td>
					<td><Link to="authorCourses" params={{ authorId: author.id }}>Courses</Link></td>
					<td>{_created }</td>
					<td>{_updated}</td>
					<td><a href="#" onClick={this.deleteAuthor.bind(this, author.id) }>Delete</a></td>
				</tr>
			);
		};

		return (
			<div>
				<table className="table">
					<thead>
						<th>Name</th>
						<th>Link</th>
						<th>Created</th>
						<th>Updated</th>
						<th></th>
					</thead>
					<tbody>
						{this.props.authors.map(createAuthorRow, this) }
					</tbody>
				</table>
			</div>
		);
	}
});

module.exports = AuthorList;