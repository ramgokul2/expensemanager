require.config({
  shim: {
    bootstrap: {
      deps: ['jquery'],
      exports: 'jquery'
    },
     "moment": {
      deps: [],
      exports: 'moment'
    },
    
    "moment-timezone": {
      deps: ['moment']
    }
  },
  paths: {
    jquery: '../bower_components/jquery/dist/jquery',
    require: '../bower_components/requirejs/require',
    backbone: '../bower_components/backbone/backbone',
    underscore: '../bower_components/underscore/underscore',
    daterangepicker: '../bower_components/bootstrap-daterangepicker/daterangepicker',
    moment: '../bower_components/moment/moment',
    "moment-timezone": '../bower_components/moment-timezone/builds/moment-timezone-with-data-2012-2022', 
    bootstrap: '../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap',
    text: '../bower_components/text/text'  }
});

define(function(require) {
  let $ = require('jquery'),
      Backbone = require('backbone'),
      _ = require('underscore');

  var HomeComponent = require('views/home'),
      ReportsComponent = require('views/reports');

  var mainrouter = Backbone.Router.extend({

    initialize: function() {
      var homeView = null,
          reportsView = null;
      homeView = new HomeComponent();
      homeView.render();    
    },

    routes: {
      '': 'root',
      'reports': 'reports'
    },

    root: function() {
      if(!this.homeView) {
        homeView = new HomeComponent();
        homeView.render();
      }
      homeView.renderSubViews();
    },

    reports: function() {
      reportsView =  new ReportsComponent();
      reportsView.render();
    }

  });
  

  router = new mainrouter();

  Backbone.history.start();
});