define(['backbone', 'underscore', 'text!templates/add-expense.html', 'jquery', 'daterangepicker', 'moment', 'moment-timezone'],
  function(Backbone, _, addexpensetmpl, $, daterangepicker, moment, tz) {

  	const addExpenseView = Backbone.View.extend({

  		template: _.template(addexpensetmpl),

  		initialize: function() {
  		  _.bindAll(this, 'render', 'saveDetails');
  		},

  		events: {
        'click .modal-close': 'closeModal',
        'click .save-expense': 'saveDetails'
      },

  		render: function() {
  			this.$el.html(this.template());
        this.$el.find('.datepicker').daterangepicker({
              "singleDatePicker": true,
         });
  		},

      saveDetails: function(e) {
        let self = this;
        e.preventDefault();
        console.log(this.model);
        self.model.save(this.getValues(), {
          success: function(model, response ) {
            console.log(response);
            self.$el.find('.error')
                .html('<span class="fa fa-check"></span>&nbsp;&nbsp; Expense Details Saved.')
                .fadeIn()
                .delay(12000)
                .fadeOut();
            self.collection.add(response.expense_detail);
            self.$el.children().remove();
          } 
        })
      },

      getValues: function() {
        let obj = {};
        obj.category = this.$el.find('#category-type option:selected').val();
        obj.expense = this.$el.find('.expense-cost').val();
        obj.date = this.$el.find('.datepicker').val();
        obj.notes = this.$el.find('.expense-desc').val();
        return obj;
      },

      closeModal: function(e) {
        e.preventDefault();
        this.$el.children().remove();
      }
  	});
  	return addExpenseView;
});