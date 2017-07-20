 /* global define*/
'use strict';
define([
    'underscore',
    'backbone',
    'moment',
    'moment-timezone',
], function(_, Backbone) {
    var HomeView = Backbone.View.extend({
        template: 'templates:home:home',
        initialize: function(){
        },
        serialize: function(){
        },
        beforeRender: function(){
        },
        afterRender: function(){
        }
    });
    return HomeView;
});
