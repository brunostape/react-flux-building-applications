"use strict";

var React = require('react');
var Router = require('react-router');
var Link = require('react-router').Link;
var CategoryStore = require('../../stores/categoryStore');
var CategoryActions = require('../../actions/categoryActions');
var CategoryList = require('./categoryList');

var CategoryPage = React.createClass({
	getInitialState: function() {
		return {
			categories: CategoryStore.getAllCategories()
		};
	},

	componentWillMount: function() {
		CategoryStore.addChangeListener(this._onChange);
	},

	//Clean up when this component is unmounted
	componentWillUnmount: function() {
		CategoryStore.removeChangeListener(this._onChange);
	},

	_onChange: function() {
		this.setState({ categories: CategoryStore.getAllCategories() });
	},

	render: function() {
		return (
			<div>
                <div className="jumbotron">
                    <h1>Categories</h1>
                    <p>This are the categories we have.</p>
                    <Link to="addCategory" className="btn btn-primary btn-sm">Add Category</Link>
                </div>
                <CategoryList categories={this.state.categories} />
            </div>
		);
	}
});

module.exports = CategoryPage;