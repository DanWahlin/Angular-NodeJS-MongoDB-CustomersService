const customersRepo = require('../../../lib/customersRepository'),
      statesRepo = require('../../../lib/statesRepository'),
      util = require('util');

class CustomersController {
    //  /api/customers
    constructor(router) {
        router.get('/', this.getCustomers.bind(this));
        router.get('/:id', this.getCustomer.bind(this));
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

    

}

module.exports = CustomersController;