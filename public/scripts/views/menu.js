define(['backbone', 'underscore', 'text!templates/menu.html', 'jquery'],
  function (Backbone, _, menutmpl, $) {

  	const menuView = Backbone.View.extend({
  		el: "#main-menu",

  		template: _.template(menutmpl),

  		initialize: function() {

  		},

  		events: {},

  		render: function() {
  			this.$el.html(this.template());
  		}
  	});
  	return menuView;
});