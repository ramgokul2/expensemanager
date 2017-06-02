define(['backbone', 'moment'], function(Backbone, moment){
  var ReportsModel = Backbone.Model.extend({
    defaults: {
      fromDate: moment().utc().format("YYYY-MM-DD"),
      toDate: moment().utc().format("YYYY-MM-DD")
    }
  });
  return ReportsModel;
});
