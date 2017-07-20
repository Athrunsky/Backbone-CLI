/* global define, app */
define([
    'underscore',
    'jquery',
    'underscore.string',
    'backbone',
    //'helpers/pop-view',
    'layoutmanager',
], function(_, $, _s, Backbone/*, PopView*/) {
    'use strict';
    var mainId = '#main';
    var NAV_MODULES_SELECTOR = '#prog-mods';
    var GeneralModel = Backbone.Model.extend({
        url: 'sites',
        attributes: [
            'title',
            'description',
            'logo',
            'timezone'
        ],
        isNew: function() {
            return false;
        }
    });

    // var clickNavModuleAnchor = function(e) {
    //     this.$(NAV_MODULES_SELECTOR + ' li.active').removeClass('active');
    //     $(e.target).parent('li').addClass('active');
    // };
    var LayoutView = Backbone.Layout.extend({
        el: '#body_wrap',
        template: 'templates:main:layout',
        model : new GeneralModel(),
        views: {
            //'#pop-view-div': new PopView()
        },
        events: {
            'click button.search': 'searchForm',
            '.search submit form': 'searchForm',
            'click #auth-out': '_authOut',
            'click #batch-config-dict-to-cabinets': '_batchConfig'
        },
        initialize: function() {
            this.listenTo(app.vent, 'navbar:active', function(mod) {
                if (this.actived !== mod) {
                    this.actived = mod;
                    this.$(NAV_MODULES_SELECTOR + ' li.active').removeClass('active');
                    this.$(NAV_MODULES_SELECTOR + ' li.' + mod).addClass('active');
                }
            });
        },

        searchForm: function(e){
            //取消默认事件
            e.preventDefault();
            var data = this.$('form').serializeObject();
            if($.isEmptyObject(data) || _s.trim(data.term) === ''){
                return Backbone.history.navigate('/danganchaxun', true);
            }
            Backbone.history.navigate('/danganchaxun/suggest/' + _s.trim(data.term), true);
        },
        serialize: function() {
            return _.extend(this.model.toJSON(), app.profile);
        },
        beforeRender: function() {

           /* var done = this.async();
            this.model.fetch().done(_.bind(function() {
                done();
            }, this));*/
        },
        afterRender: function() {
            /*var view = this;*/
            this.$(NAV_MODULES_SELECTOR + ' li.' + this.actived).addClass('active');
            this.$('.dropdown-toggle').dropdown();
            /*this.$('ul#prog-mods li').click(function(){
                view.$('#main-navbar-toggle').trigger('click');
            });*/
            //this.$(mainId).height($(window).height() - this.$('#header').height());
            //加载tip-view
            var tipView = this.$('.tip-view');
            tipView.blur(_.bind(function(){
                tipView.hide();
            }, this));
            this.$el.on('click', '.tip-to-view', function(e){
                var x = e.clientX;
                var y = e.clientY;
                tipView.html($(e.target).html());
                tipView.css('top', y+20);
                tipView.css('left', x-tipView.width()/2);
                tipView.show();
                tipView.focus();
            });
        },
        _authOut: function(){
            if(app.consumableDiff){
                app.vent.trigger('notify', {
                    text: {
                        title: 'Consumable diff not saved',
                        content: 'Please save first'
                    }
                });
                return;
            }
            app.authOut();
        },
        /**
        * replace view with name
        * if view already exists, call view.remove function and set it.
        */
        setMainView: function(view) {
            var originView = this.getView(mainId);
            if (originView) {
                if(originView.beforeRemove && _.isFunction(originView.beforeRemove)){
                    originView.beforeRemove();
                }
                originView.remove();
            }
            //
            $('body').css('background-image', 'none');
            return this.setView(mainId, view);
        },
        getMainView: function() {
            return this.getView(mainId);
        }
    });
    return LayoutView;
});
