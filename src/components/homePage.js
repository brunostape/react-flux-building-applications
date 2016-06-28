"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var Home = React.createClass({
    render: function(){
        return (
            <div>
                <div className="jumbotron">
                    <h1>Home</h1>
                    <p>Este é o meu primeiro componente usando React.</p>
                    <Link to="about" className="btn btn-primary btn-sm">Learn more</Link>
                </div>
                <div>
                </div>
            </div>
        );
    } 
});

module.exports = Home;