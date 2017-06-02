define(['backbone', 'moment'], function(Backbone, moment){
  var ReportsModel = Backbone.Model.extend({
    defaults: {
      fromDate: moment().utc().format(),
      toDate: moment().utc().format()
    }
  });
  return ReportsModel;
});
