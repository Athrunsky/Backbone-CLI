/* global define, app */
'use strict';
define([
    'backbone',
    'home/home-view'
], function (Backbone,HomeView) {
    var IndexRouter = Backbone.Router.extend({
        routes: {
            '': 'HomeView',
            'home\.*': 'HomeView'
        },
        HomeView: function() {
            app.vent.trigger('navbar:active', 'HomeView');
            app.$layout.setMainView(new HomeView()).render();
        }
    });
    return IndexRouter;
});
