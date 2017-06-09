process.env.NODE_ENV = 'test';

let mongoose = require('mongoose'),
	Expense = require('../server/models/expense');

let chai = require('chai'),
	chaiHttp = require('chai-http'),
	main = require('../main'),
    db = require('../server/helper/db'),
    expense = require('../server/models/expense')
    config = require('../config.js');
	should = chai.should();

//console.log('NODE_ENV: ' + config.util.getEnv('NODE_ENV'));


chai.use(chaiHttp);

describe("Post api", () => {
  let id, dummyPost;

  before((done) => {
      mongoose.createConnection(config.testDb, () => {
          console.log('Connected to: '+ config.testDb);
          done();
      });

  });

    describe('Expenses', () => {
            beforeEach((done) => { //Before each test we empty the database
                Expense.remove({}, (err) => { 
                   done();         
                });     
            });

            describe('POST addExpense', () => {
                it('it should not post without expenses', (done) => {
                    let expense = {
                        category: 'Food',
                        notes: 'Lunch @ BBQ',
                        date: '11/11/2017'
                    }
                    chai.request(main)
                     .post('/api/addExpense')
                     .send(expense).
                     end((err, res) => {
                        res.should.not.have.status(200);
                        res.should.have.status(500);
                        res.body.should.have.property('message').eql('Could not save expense details');
                        done();
                     })
                })
            	it('it should post expense details', (done) => {
            		let expense = {
            			category: 'Food',
            			expense: 900,
            			notes: "Lunch @ BBQ",
            			date: "11/11/2017"    		
            		}
            		chai.request(main)
            		.post('/api/addExpense')
            		.send(expense)
            		.end((err, res) => {
                        //expect(res).to.have.status(200);
            			res.should.have.status(200);
            			res.body.should.be.a('object');
                        res.body.should.have.property('message').eql('Saved details Successfully');
            			done();
            		});
            	});
            });	
    });   
});     

