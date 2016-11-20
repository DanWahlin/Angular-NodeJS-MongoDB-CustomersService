const  util = require('util');

class TokensController {

    constructor(router) {
        router.get('/csrf', this.getCsrfToken.bind(this));
    }

    getCsrfToken(req, res) {
        console.log('*** getCsrfToken');
        const csrfToken = res.locals._csrf;
        res.json({ csrfToken: csrfToken });
    }
}

module.exports = TokensController;