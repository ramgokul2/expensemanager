define(['backbone', 'underscore', 'text!templates/reports.html', 'jquery', 'daterangepicker', 'moment', 'moment-timezone', 'models/reports', 'amcharts.pie'],
  function(Backbone, _, reportstmpl, $, daterangepicker, moment, tz, ReportsModel, AmCharts) {

  	const reportsView = Backbone.View.extend({
  		el: "#main-container",

  		template: _.template(reportstmpl),

  		initialize: function() {
  		  _.bindAll(this, 'setDates', 'renderData');
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
        this.renderData();
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
        }).done(function(result, textStatus, xhr) {
          if(result.data.length === 0) {
            self.$el.find('#pie-chart').hide();
            self.$el.find('reports-stats').show();
            self.$el.find('.reports-stats').html("<h2 class='msg'>NO EXPENSE DETAILS FOUND!!!</h2>");
            return;
          } else {
            self.$el.find('.reports-stats').hide();
            self.$el.find('#pie-chart').show();
          }
          var summary = {},
              details = [];
          var resObj = _.map(result.data, function(dt) {
            var data = {
             // date: moment(dt.date).format("YYYY-MM-DD"),
              expenses: _.map(dt.expenses, function(t) {
                summary[t.category] = (typeof summary[t.category] === 'undefined')? t.expense: summary[t.category] + t.expense;
              })
            }
            return data;
          });
          var keys = Object.keys(summary),
              value = Object.values(summary);

          for(let index=0; index<keys.length; index++) {
            let processedResult = {
              category: keys[index],
              expense: value[index] 
            }
            details.push(processedResult);
          }    
          var makeChart = function() {
           var chart = AmCharts.makeChart( "pie-chart", {
           "type": "pie",
            "theme": "light",
            "dataProvider":details,
            "valueField": "expense",
            "titleField": "category",
            "outlineAlpha": 0.4,
            "depth3D": 15,
            "balloonText": "[[title]]<br><span style='font-size:14px'><b>[[value]]</b> ([[percents]]%)</span>",
            "angle": 30,
            "legend": {
              valueText :'\n'
            },
            "export": {
              "enabled": true
            }
            } );
          }

          makeChart();
        });    
      },
  	});
  	return reportsView;
});