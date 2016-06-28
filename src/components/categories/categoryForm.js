"use strict";

var React = require('react');
var Input = require('../common/textInput');

var CategoryForm = React.createClass({
	propTypes: {
		category: React.PropTypes.object.isRequired,
		onSave: React.PropTypes.func.isRequired,
		onChange: React.PropTypes.func.isRequired,
		errors: React.PropTypes.object
	},

	render: function () {
		return (
			<form>
				<Input
					name="name"
					label="Name"
					value={this.props.category.name}
					onChange={this.props.onChange}
					error={this.props.errors.name} />

				<Input
					name="description"
					label="Description"
					value={this.props.category.description}
					onChange={this.props.onChange}
					error={this.props.errors.description} />

				<input type="submit" value="Save" className="btn btn-default" onClick={this.props.onSave} />
			</form>
		);
	}
});

module.exports = CategoryForm;