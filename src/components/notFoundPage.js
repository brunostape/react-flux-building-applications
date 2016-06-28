"use strict";

var React = require('react');
var Link = require('react-router').Link;

var NotFoundPage = React.createClass({
	render: function () {
		return (
			<div>
				<div className="jumbotron">
					<h1>Page Not Found</h1>
					<p>Whoops!Sorry, there is nothing to see here.</p>
					<p><Link to="app" className="btn btn-primary btn-lg">Back to Home</Link></p>
				</div>
			</div>
		);
	}
});

module.exports = NotFoundPage;