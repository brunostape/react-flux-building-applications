"use strict";

var React = require('react');
var Input = require('../common/textInput');
var Select = require('../common/select');

var CourseForm = React.createClass({
	propTypes: {
		course: React.PropTypes.object.isRequired,
		authors: React.PropTypes.object.isRequired,
		categories: React.PropTypes.object.isRequired,
		onSave: React.PropTypes.func.isRequired,
		onChange: React.PropTypes.func.isRequired,
		errors: React.PropTypes.object
	},

	render: function () {
		return (
			<form>
				<Input
					name="title"
					label="Title"
					tipo="string"
					value={this.props.course.title}
					onChange={this.props.onChange}
					error={this.props.errors.title} />

				<Select
					name="authorId"
					label="Author"
					tipo="int"
					value={this.props.course.authorId}
					list={this.props.authors}
					onChange={this.props.onChange}
					error={this.props.errors.authorId} />

				<Select
					name="categoryId"
					label="Category"
					tipo="int"
					value={this.props.course.categoryId}
					list={this.props.categories}
					onChange={this.props.onChange}
					error={this.props.errors.categoryId} />

				<Input
					name="length"
					label="Length"
					tipo="string"
					value={this.props.course.length}
					onChange={this.props.onChange}
					error={this.props.errors.length} />

				<input type="submit" value="Save" className="btn btn-default" onClick={this.props.onSave} />
			</form>
		);
	}
});

module.exports = CourseForm;