'use strict';
exports.handler = (event, context, callback) => {
    //Get contents of response
    const response = event.Records[0].cf.response;
    const headers = response.headers;

    //Set new headers
    headers['Strict-Transport-Security'] = [{ key: 'Strict-Transport-Security', value: 'max-age= 63072000; includeSubdomains; preload' }];
    headers['Content-Security-Policy'] = [{ key: 'Content-Security-Policy', value: "default-src 'none'; img-src 'self'; script-src 'self'; style-src 'self'; object-src 'none'" }];
    headers['X-Content-Type-Options'] = [{ key: 'X-Content-Type-Options', value: 'nosniff' }];
    headers['X-Frame-Options'] = [{ key: 'X-Frame-Options', value: 'DENY' }];
    headers['X-XSS-Protection'] = [{ key: 'X-XSS-Protection', value: '1; mode=block' }];
    headers['Referrer-Policy'] = [{ key: 'Referrer-Policy', value: 'same-origin' }];

    //Return modified response
    callback(null, response);
};
