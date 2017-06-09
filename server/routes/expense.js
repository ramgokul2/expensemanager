const express = require('express'),
	  router = express.Router(),
	  async = require('async'),
    moment = require('moment')

const ExpenseModel = require('../models/expense');	  

router.post('/addExpense', function(req, res) {
  let expenseValid = validateExpense(req.body),
      expenseModel = getValues(req.body);

  ExpenseModel.findOne({ date: expenseModel.date }, function(err, counts) {
  	if(err) {
  		return res.status(500).json({
        'message': 'Could not find details'
      });
  	} else {
  		if(counts) {
  			ExpenseModel.update( { date: expenseModel.date },
                             { $push: { expenses: { $each: expenseModel.expenses }}},
  								           { upsert: true},
          function(err, result) {
  				if(err) {
  					return res.status(500).json({
  						'message': 'Could not update expense details'
  					});
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
              'message': 'Saved details Successfully',
  		        'expense_detail': expense
  		      });
  		    }
  		  });
  		}
  	}
  });
});

router.post('/fetchExpenses', function(req, res) {
	let fdate = moment(req.body.fromDate).format(),
      tdate = moment(req.body.toDate).add(1,'days').format()
      
  	ExpenseModel.find({
  		date: {
  			$gt: fdate,
  			$lte: tdate
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
});

function validateExpense(expense) {
  let error = null,
      date = new Date(expense.date);

  if(isNaN(date.getTime())) {
    error = "The date you have provided is invalid!";
  } else if(isNaN(expense.expense)) {
    error = "The amount you entered is not in number";
  } else if(expense.notes.length>150) {
    error = "Notes length exceeds limit";
  }
  return error? {"error": error}: expense;
}   

function getValues(expense) {
  let expenseObj = {
    category: expense.category,
    notes: expense.notes,
    expense: expense.expense
  }
  expenseModel = new ExpenseModel({
    expenses: expenseObj,
    date: moment(expense.date).add('1', 'days').format()
  });
  return expenseModel;
}
module.exports = router;