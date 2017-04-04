'use strict';

var ng = require('angular');

module.exports = ng.module('demo', [
    require('angular-ui-router'),

    require('./helloWorld/helloWorld')
]).config([
    '$stateProvider',
    '$locationProvider',
    function (
        $stateProvider,
        $locationProvider
    ) {
        $stateProvider.state('index', {
            url: '/',
            template: '<hello-world></hello-world>'
        });

        $locationProvider.html5Mode(true);
    }
]);

ng.bootstrap(document, [ 'demo' ]);
