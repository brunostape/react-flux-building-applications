"use strict";

var React = require('react');

var Router = require('react-router');
var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;
var NotFoundRoute = Router.NotFoundRoute;
var Redirect = Router.Redirect;

var routes = (
  <Route name="app" path="/" handler={require('./components/app')}>
    <DefaultRoute handler={require('./components/homePage')} />
    <Route name="home" handler={require('./components/homePage')} />
    <Route name="courses" handler={require('./components/courses/coursePage')} />
    <Route name="authorCourses" path="courses/authors/:authorId" handler={require('./components/courses/coursePage')} />
    <Route name="categoryCourses" path="courses/categories/:categoryId" handler={require('./components/courses/coursePage')} />
    <Route name="addCourse" path="course" handler={require('./components/courses/manageCoursePage')} />
    <Route name="manageCourse" path="course/:id" handler={require('./components/courses/manageCoursePage')} />
    <Route name="authors" handler={require('./components/authors/authorPage')} />
    <Route name="addAuthor" path="author" handler={require('./components/authors/manageAuthorPage')} />
    <Route name="manageAuthor" path="author/:id/?:origin?" handler={require('./components/authors/manageAuthorPage')} />
    <Route name="categories" handler={require('./components/categories/categoryPage')} />
    <Route name="addCategory" path="category" handler={require('./components/categories/manageCategoryPage')} />
    <Route name="manageCategory" path="category/:id/?:origin?" handler={require('./components/categories/manageCategoryPage')} />
    <Route name="about" handler={require('./components/about/aboutPage')} />
    <NotFoundRoute handler={require('./components/notFoundPage')} />
    <Redirect from="about-us" to="about" />
    <Redirect from="about/*" to="about" />
  </Route>
);

module.exports = routes;