/* global define*/
'use strict';
define([
    'underscore',
    'backbone',
    /*'client',*/
    'app',
    'layout-view',
    /*'socket.io'*/
], function (_, Backbone, /*Client,*/ Application, LayoutView/*, io*/) {

    window.debug = function(info){
        if(DEBUG && _.isString(info)){
            console.log(info);
        }
    };

    var app = window.app = new Application();
    /*var client = window.client = new Client();*/
    // 获取用户信息
    app.vent.on('initialize:before', function() {
        // 理论上来说这玩意时延时加载的...
        // body...
        app.loadModules([
            'home'
        ]).done(function() {
            Backbone.history.start({ pushState: true });
            /*_.delay(function(){
                //var indexOptions = _.extend({}, $('base#options').data());
                if(indexOptions.navigation && indexOptions.navigation !== '' && indexOptions.navigation !== 'null'){
                    Backbone.history.navigate(indexOptions.navigation, true);
                }
            }, 0);*/
        });
    });
    var profile = {
        id: '1',
        name: '张三',
        username: 'service2@rivamed.cn',
        mobile: '13899999991',
        telephone: '010-87678901',
        description: '备注',
        position:'QA'
    };
    app.profile = profile;
    app.$layout = new LayoutView();
    app.$layout.render();
    app.datetimeFormat = 'YYYY-MM-DD HH:mm:ss';
    app.dateFormat = 'YYYY-MM-DD';
    // 首先加载语言文件
    console.log('app start');
    app.start();

});
