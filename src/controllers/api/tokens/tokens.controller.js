const  util = require('util'),
       url = require('url');

//#### WARNING: Shown for an example but not recommended!!!!
//#### Read more at https://github.com/pillarjs/understanding-csrf
//#### The following is not recommended - said that twice now!!!! :-)

class TokensController {

    constructor(router) {
        //Check referer
        router.use(this.refererCheck.bind(this));

        //This can be VERY, VERY DANGEROUS if not done properly so just avoid it! Make sure:
        //1. CORS is disabled for this route if you've enabled CORS (CORS is not enabled in this app)
        //   Note that disabling CORS won't prevent GET/POST requests using standard HTML though
        //2. Should always check referrer to be safe (see referrerCheck() middleware above)
        router.get('/csrf', this.getCsrfToken.bind(this));
    }

    refererCheck(req, res, next) {
        //Simple check to ensure that calls to routes here are only supported for http(s)://localhost:3000
        var referer = url.parse(req.headers.referer);
        console.log('Referer: ' + req.headers.referer);
        if (referer.host !== 'localhost' && referer.port !== '3000') {
            throw new Error('Invalid request');
        }
        next();
    }

    getCsrfToken(req, res) {
        console.log('*** getCsrfToken');
        res.json({ csrfToken: res.locals._csrf });
    }
}

module.exports = TokensController;