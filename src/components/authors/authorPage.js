"use strict";

var React = require('react');
var Router = require('react-router');
var Link = require('react-router').Link;
var AuthorStore = require('../../stores/authorStore');
var AuthorActions = require('../../actions/authorActions');
var AuthorList = require('./authorList');

var AuthorPage = React.createClass({
	getInitialState: function() {
		return {
			authors: AuthorStore.getAllAuthors()
		};
	},

	componentWillMount: function() {
		AuthorStore.addChangeListener(this._onChange);
	},

	//Clean up when this component is unmounted
	componentWillUnmount: function() {
		AuthorStore.removeChangeListener(this._onChange);
	},

	_onChange: function() {
		this.setState({ authors: AuthorStore.getAllAuthors() });
	},

	render: function() {
		return (
			<div>
                <div className="jumbotron">
                    <h1>Authors</h1>
                    <p>This are the authors we have.</p>
                    <Link to="addAuthor" className="btn btn-primary btn-sm">Add Author</Link>
                </div>
                <AuthorList authors={this.state.authors} />
            </div>
		);
	}
});

module.exports = AuthorPage;