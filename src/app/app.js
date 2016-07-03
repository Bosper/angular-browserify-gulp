require('angular');
window.jQuery = $ = require('jquery');

var bootstrap = require('bootstrap-sass');

var HomeController = require( './controllers/HomeController' );

var app = angular.module( 'app', [] );

app.controller( 'Controller', [ '$scope', HomeController ] );
