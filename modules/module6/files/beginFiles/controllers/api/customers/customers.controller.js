const customersRepo = require('../../../lib/customersRepository'),
      statesRepo = require('../../../lib/statesRepository'),
      util = require('util');

class CustomersController {
    //  /api/customers
    constructor(router) {
        router.get('/', this.getCustomers.bind(this));
        router.get('/:id', this.getCustomer.bind(this));
        router.post('/', this.insertCustomer.bind(this));
        router.put('/:id', this.updateCustomer.bind(this));
    }

    getCustomers(req, res) {
        console.log('*** getCustomers');
        customersRepo.getCustomers((err, data) => {
            if (err) {
                console.log('*** getCustomers error: ' + util.inspect(err));
                res.json(null);
            } else {
                console.log('*** getCustomers ok');
                res.json(data.customers);
            }
        });
    }

    getCustomer(req, res) {
        console.log('*** getCustomer');
        const id = req.params.id;
        customersRepo.getCustomer(id, (err, customer) => {
            if (err) {
                console.log('*** getCustomer error: ' + util.inspect(err));
                res.json(null);
            } else {
                console.log('*** getCustomer ok');
                res.json(customer);
            }
        });

    }

    insertCustomer(req, res) {
        console.log('*** insertCustomer');
        statesRepo.getState(req.body.stateId, (err, state) => {
            if (err) {
                console.log('*** statesRepo.getState error: ' + util.inspect(err));
                res.json({ status: false, error: 'State not found', customer: null });
            } else {
                customersRepo.insertCustomer(req.body, state, (err, customer) => {
                    if (err) {
                        console.log('*** customersRepo.insertCustomer error: ' + util.inspect(err));
                        res.json({status: false, error: 'Insert failed', customer: null});
                    } else {
                        console.log('*** insertCustomer ok');
                        res.json({ status: true, error: null, customer: customer });
                    }
                });
            }
        });
    }

    updateCustomer(req, res) {
        console.log('*** updateCustomer');
        console.log('*** req.body');
        console.log(req.body);

        statesRepo.getState(req.body.stateId, (err, state) => {
            if (err) {
                console.log('*** statesRepo.getState error: ' + util.inspect(err));
                res.json({ status: false, error: 'State not found', customer: null });
            } else {
                customersRepo.updateCustomer(req.params.id, req.body, state, (err, customer) => {
                    if (err) {
                        console.log('*** customersRepo.updateCustomer error: ' + util.inspect(err));
                        res.json({status: false, error: 'Update failed', customer: null});
                    } else {
                        console.log('*** updateCustomer ok');
                        res.json({ status: true, error: null, customer: customer });
                    }
                });
            }
        });
    }


    

}

module.exports = CustomersController;