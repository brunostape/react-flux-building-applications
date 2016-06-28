"use strict";

var React = require('react');

var Select = React.createClass({
    propTypes: {
        name: React.PropTypes.string.isRequired,
        label: React.PropTypes.string.isRequired,
        list: React.PropTypes.object.isRequired,
        onChange: React.PropTypes.func.isRequired,
        placeholder: React.PropTypes.string,
        value: React.PropTypes.string,
        error: React.PropTypes.string,
        tipo: React.PropTypes.string
    },

    render: function () {
        var populateOption = function (item) {

            if (item.name) {
                return (
                    <option value={item.id}>{item.name}</option>
                );
            }
            else {
                return (
                    <option value={item.id}>{item.firstName + " " + item.lastName}</option>
                );
            }
        };

        var wrapperClass = 'form-group';
        if (this.props.error && this.props.error.length > 0) {
            wrapperClass += " " + 'has-error';
        }

        return (
            <div className={wrapperClass}>
                <label htmlFor={this.props.name}>{this.props.label}</label>
                <div className="field">
                    <select type="text"
                        name={this.props.name}
                        className="form-control"
                        ref={this.props.name}
                        value={this.props.value}
                        tipo={this.props.tipo}
                        onChange={this.props.onChange}>
                        <option value="">--Select One--</option>
                        {this.props.list.map(populateOption, this) }
                    </select>
                    <div className="input">{this.props.error}</div>
                </div>
            </div>
        );
    }
});

module.exports = Select;