define([
  'underscore',
  'backbone'
], function (_, Backbone) {
  'use strict';

  var ExpenseTrackerModel = Backbone.Model.extend({
    url: '/api/addExpense',

    initialize: function() {
      this.expenseDate = new Date();
    },

    defaults: {
      category: '',
      expense: '',
      notes: '',
      date: ''
    },

    validate: function(attrs, options) {
      var errors = [];
      if(!attrs.category) {
        errors.push({ name:'category', message:'Please choose a category' });
      }

      if(!attrs.expense) {
        errors.push({ name: 'expense', message: 'Please add expense details'});
      }

      if(!attrs.date) {
        errors.push({ name: 'date', message: 'Please select a date'});
      }

      return errors.length > 0 ? errors: false;
    },

    parse: function(response, options)  {
      return response;
    }
  });

  return ExpenseTrackerModel;
});
