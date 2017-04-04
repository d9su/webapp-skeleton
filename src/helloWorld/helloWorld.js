'use strict';

var ng = require('angular');
var insertCss = require('insert-css');

insertCss(require('./helloWorld.less'));

module.exports = ng.module('app.helloWorld', []).directive('helloWorld', [
    function () {
        return {
            template: require('./helloWorld.html'),
            restrict: 'E',
            replace: true,
            scope: {},
            link: function (scope) {
                scope.message = 'Hello World';
            }
        };
    }
]).name;
