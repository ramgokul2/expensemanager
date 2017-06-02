define([
  'underscore',
  'backbone',
  'models/expense'
], function (_, Backbone, ExpenseTrackerModel) {
  'use strict';

  var ExpenseTrackerCollection = Backbone.Collection.extend({
    model: ExpenseTrackerModel
  });

  return ExpenseTrackerCollection;
});
