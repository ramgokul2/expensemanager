define(['backbone', 'underscore', 'text!templates/reports.html', 'jquery'],
  function(Backbone, _, reportstmpl, $ ) {

  	const reportsView = Backbone.View.extend({
  		el: "#main-container",

  		template: _.template(reportstmpl),

  		initialize: function() {
  		
  		},

  		events: {
        
      },

  		render: function() {
  			this.$el.html(this.template());
  		},

  	});
  	return reportsView;
});