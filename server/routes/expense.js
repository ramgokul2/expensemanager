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
  					return res.status(200).json({
              'message': 'Successfully saved'
            });
  				}
  			});
  		} else {
  			expenseModel.save(function(err, expense) {
          console.log(expense);
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

router.post('/fetchExpenses', function(req, res) {
	let fdate = req.body.fromDate,
      tdate = req.body.toDate,
      category = req.body.category
  if(category === "All") {    
  	ExpenseModel.find({
  		date: {
  			$gt: fdate,
  			$lt: tdate
  		}
  	}, function(err, result) {
      console.log(result);
      if(err) {
        return res.status(500).json({
          'message': 'Could not fetch expense details'
        });
      } else {
        return res.status(200).json({
          data: result
        });
      }
    });
    }
});   
module.exports = router;