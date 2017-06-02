define(['backbone', 'underscore', 'text!templates/home.html', 'jquery', 'views/menu', 'views/content'],
  function(Backbone, _, hometmpl, $, menuComponent, contentComponent) {

  	const homeView = Backbone.View.extend({
  		el: "#mainwrapper",

  		template: _.template(hometmpl),

  		initialize: function() {
  			this.menuView = null;
  			this.contentView = null;
  		},

  		events: {},

  		renderSubViews: function() {
  			mainView = new menuComponent();
  			contentView = new contentComponent();
  			mainView.render();
  			contentView.render();
  		},

  		render: function() {
  			this.$el.html(this.template());
  		}
  	});
  	return homeView;
});