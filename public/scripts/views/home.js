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
  			contentView = new contentComponent();
  			contentView.render();
  		},

  		render: function() {
  			this.$el.html(this.template());
        mainView = new menuComponent();
        mainView.render();
  		}
  	});
  	return homeView;
});