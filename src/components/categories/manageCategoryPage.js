"use strict";

var React = require('react');
var Router = require('react-router');
var Link = require('react-router').Link;
var CategoryForm = require('./categoryForm');
var CategoryActions = require('../../actions/categoryActions');
var CategoryStore = require('../../stores/categoryStore');
var toastr = require('toastr');

var ManageCategoryPage = React.createClass({
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
			category: { id: 0, name: '', description: '' },
			returnUrl: 'categories',
			errors: {},
			dirty: false
		};
	},

	componentWillMount: function () {
		var categoryId = this.props.params.id; //from the path '/category:id'
		if (categoryId) {
			this.setState({ category: CategoryStore.getCategoryById(categoryId) });
		}

		var urlOrigin = this.props.params.origin;
		if (urlOrigin) {
			this.setState({ returnUrl: urlOrigin });
		}
	},

	setCategoryState: function (event) {
		this.setState({ dirty: true });
		var field = event.target.name;
		var value = event.target.value;
		this.state.category[field] = value;
		return this.setState({ category: this.state.category });
	},

	categoryFormIsValid: function () {
		var formIsValid = true;
		this.state.errors = {}; //clear any previous errors.

		if (this.state.category.name.length < 3) {
			this.state.errors.name = 'Name must be at least 3 characters.';
			formIsValid = false;
		}

		if (this.state.category.description.length < 10) {
			this.state.errors.description = 'Category must be at least 10 characters.';
			formIsValid = false;
		}

		this.setState({ errors: this.state.errors });
		return formIsValid;
	},

	saveCategory: function (event) {
		event.preventDefault();

		if (!this.categoryFormIsValid()) {
			return;
		}

		if (this.state.category.id) {
			CategoryActions.updateCategory(this.state.category);
		} else {
			CategoryActions.createCategory(this.state.category);
		}

		this.setState({ dirty: false });
		toastr.success('Category saved.');
		this.transitionTo(this.state.returnUrl);
	},

	render: function () {
		return (
			<div>
                <div className="jumbotron">
                    <h1>Manage Category</h1>
                    <p>Here is where you add news categories.</p>
                    <Link to="categories" className="btn btn-primary btn-sm">All Categories</Link>
                </div>
                <CategoryForm
                    category={this.state.category}
                    returnUrl={this.state.returnUrl}
                    onChange={this.setCategoryState}
                    onSave={this.saveCategory}
                    errors={this.state.errors} />
            </div>
		);
	}
});

module.exports = ManageCategoryPage;