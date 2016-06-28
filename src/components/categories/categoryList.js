"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var CategoryActions = require('../../actions/categoryActions');
var toastr = require('toastr');

var CategoryList = React.createClass({
	propTypes: {
		categories: React.PropTypes.array.isRequired
	},

	deleteCategory: function (id, event) {
		event.preventDefault();

		var _deleted = CategoryActions.deleteCategory(id);

		if (_deleted) {
			toastr.success('Category Deleted');
		} else {
			toastr.error('This category can\'t be deleted.');
		}
	},

	render: function () {
		var createCategoryRow = function (category) {
			var _created = new Date(category.created).toDateString();
			var _updated = category.updated !== undefined ? new Date(category.updated).toDateString() : "-";
			
			return (
				<tr key={category.id}>
					<td><Link to="manageCategory" params={{ id: category.id }}>{category.name}</Link></td>
					<td><Link to="categoryCourses" params={{ categoryId: category.id }}>Courses</Link></td>
					<td>{_created}</td>
					<td>{_updated}</td>
					<td><a href="#" onClick={this.deleteCategory.bind(this, category.id) }>Delete</a></td>
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
						{this.props.categories.map(createCategoryRow, this) }
					</tbody>
				</table>
			</div>
		);
	}
});

module.exports = CategoryList;