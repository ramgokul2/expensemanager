const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const expenseSchema = new Schema({
	category: { type:String, required: true },
	notes: { type: String },
	expense: { type: Number, required: true }
}),
	dayExpenseSchema = new Schema({
		expenses: [ expenseSchema ],
		date: { type: Date, required: true }
	});

const Expense = mongoose.model('Expense', dayExpenseSchema);
module.exports = Expense;
