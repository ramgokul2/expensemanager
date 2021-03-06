define(['backbone', 'underscore', 'text!templates/add-expense.html', 'jquery', 'daterangepicker', 'moment', 'moment-timezone'],
  function(Backbone, _, addexpensetmpl, $, daterangepicker, moment, tz) {

  	const addExpenseView = Backbone.View.extend({

  		template: _.template(addexpensetmpl),

  		initialize: function() {
  		  _.bindAll(this, 'render', 'saveDetails');
  		},

  		events: {
        'click .modal-close': 'closeModal',
        'click .save-expense': 'saveDetails',
        'click .modal-checkbox': 'checkUpdate'
      },

  		render: function() {
  			this.$el.html(this.template());
        this.$el.find('.datepicker').daterangepicker({
              "singleDatePicker": true,
         });
        this.$el.find('.expense-customcategory').attr("disabled", true).addClass("disabled");
  		},

      checkUpdate: function() {
        let isChecked = this.$el.find('.modal-checkbox').is(":checked");
        if(isChecked) {
          this.$el.find('.category-type').attr("disabled",true).addClass("disabled");
          this.$el.find('.expense-customcategory').removeAttr('disabled').removeClass("disabled");
        } else {
          this.$el.find('.category-type').removeAttr('disabled').removeClass("disabled");
          this.$el.find('.expense-customcategory').attr("disabled", true).addClass("disabled");
        }
      },

      saveDetails: function(e) {
        e.preventDefault();
        let self = this,
            hasErrors = self.validateForm();
        if(!hasErrors) {
          self.model.save(this.getValues(), {
            success: function(model, response ) {
              console.log(response);
              self.$el.find('.error')
                  .html('<span class="fa fa-check"></span>&nbsp;&nbsp; Expense Details Saved.');
              self.collection.add(response.expense_detail);    
              this.setTimeout(function() {
                self.$el.children().remove();
              }, 2500);    
            },
            error: function(model, response) {
              var errors = response.responseJSON;
              self.$el.find('.error').html('<span class="fa fa-times">&nbsp;nbsp;' + ( response.responseJSON));
            } 
          }) 
        }  
      },

      validateForm: function() {
        var self = this;

        self.$el.find('.expense-error').text('');
        self.$el.find('.expense-category-error').text('');

        var errors = self.model.validate(_.pick(self.getValues(), 'expense', 'date', 'category'));
            _.each(errors, function(error) {
              let name = error.name;
              if(name === "category") {
                self.$el.find(".expense-category-error").text(error.message);
              }

              if(name === "expense") {
                self.$el.find('.expense-error').text(error.message);
              } else if(name === "date") {
                self.$el.find('.date-error').text(error.message);
              }
           });
            return (errors.length)?true:false;
      },

      getValues: function() {
        let obj = {};
        obj.category = this.$el.find('#category-type option:selected').val();
        if(obj.category === '') {
          obj.category = this.$el.find('.expense-customcategory').val();
        }
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