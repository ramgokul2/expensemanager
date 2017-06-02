define(['backbone', 'underscore', 'text!templates/content.html', 'jquery', 'views/add-expense', 'models/expense', 'collections/expenses'],
  function(Backbone, _, contenttmpl, $, AddExpenseView, Expense, Expenses ) {

  	const contentView = Backbone.View.extend({
  		el: "#main-container",

  		template: _.template(contenttmpl),

  		initialize: function() {
  		
  		},

  		events: {
        'click .add': 'showModal'
      },

  		render: function() {
  			this.$el.html(this.template());
  		},

      showModal: function(e) {
        e.preventDefault();
        var expense = new Expense();
        var expenses = new Expenses();
        addExpenseView = new AddExpenseView({ 
          el: this.$el.find('.modal-container'),
          model: expense,
          collection: expenses 
        });
        addExpenseView.render();
      }

  	});
  	return contentView;
});