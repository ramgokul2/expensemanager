define(['backbone', 'underscore', 'text!templates/reports.html', 'jquery', 'daterangepicker', 'moment', 'moment-timezone', 'models/reports'],
  function(Backbone, _, reportstmpl, $, daterangepicker, moment, tz, ReportsModel ) {

  	const reportsView = Backbone.View.extend({
  		el: "#main-container",

  		template: _.template(reportstmpl),

  		initialize: function() {
  		  _.bindAll(this, 'setDates');
       // this.listenTo(this.model, 'change', this.setDates)
  		},

  		events: {
        'apply.daterangepicker .reports-datepicker': 'setDates',
        'click .renderData': 'renderData'
      },

  		render: function() {
  			this.$el.html(this.template());
        this.$el.find('.reports-datepicker').daterangepicker({
        });
  		},

      setDates: function(e, datepicker) {
        this.model.set({
          fromDate: moment(datepicker.startDate).format("YYYY-MM-DD"),
          toDate: moment(datepicker.endDate).format("YYYY-MM-DD")
        });
      },

      renderData: function() {
        let self = this,
            expenseData = {
              fromDate: this.model.get('fromDate'),
              toDate: this.model.get('toDate'),
              category: this.$el.find('.category-type').val()
            };
        $.ajax({
          url: "api/fetchExpenses",
          method: "POST",
          data: expenseData
        }).done(function(data, textStatus, xhr) {
          console.log(data);
        });    
      }

  	});
  	return reportsView;
});