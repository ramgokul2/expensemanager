const express = require('express'),
	  router = express.Router(),
	  async = require('async')

const ExpenseModel = require('../models/expense');	  

router.post('/addExpense', function(req, res) {
  let expenseObj = {
  	category: req.body.category,
  	notes: req.body.notes,
  	expense: req.body.expense
  },
  expenseDate = req.body.date,
  expenseModel = new ExpenseModel({
    expenses: expenseObj,
    date: expenseDate
  });
  ExpenseModel.findOne({ date: expenseDate }, function(err, counts) {
  	if(err) {
  		return res.status(500).json({
        'message': 'Could not find details'
      });
  	} else {
  		if(counts) {
  			ExpenseModel.update( { date: expenseDate }, { $push: { expenses: { $each: expenseModel.expenses }}},
  								 { upsert: true}, function(err, result) {
  				if(err) {
  					return res.status(500).json({
  						'message': 'Could not update expense details'
  					})
  				} else {
  					console.log(result);
  				}
  			});
  		} else {
  			expenseModel.save(function(err, expense) {
		    if(err) {
		      return res.status(500).json({
		        'message': 'Could not save expense details'
		      });
		    } else {
		      return res.status(200).json({
		        'expense_detail': expense
		      });
		    }
		  });
  		}
  	}
  });
});

router.post('/fetchExpense', function(req, res) {
	let date = req.body.date;
	ExpenseModel.findOne({
		date: {
			$gt: "2017-05-01 18:30:00.000Z",
			$lt: "2019-07-03 18:30:00.000Z"
		}
	}).pretty();
})

module.exports = router;