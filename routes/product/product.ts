import _ = require('lodash');

import Product = require('../../models/product');

module.exports = function(app) {
    
    
    
    
    app.get('/products', (req, res) => res.send('Got a request for products')); // 2 
 
 
    let _products = [
        {
            "name" :"yoga",
            "category" :"hybrid",
            "manufacturer" :"Lenovo",
            "price" : 750.99
        }
    ];

    /* Create */
    app.post('/product', function (req, res) {
        _products.push(req.body);
        res.json({info: 'product created successfully'});
    });

    /* Read */
    app.get('/product', function (req, res) {
        res.send(_products);
    });
 
 
 
    /* Read */
    // app.get('/product', function (req, res) {
    //     Product.find(function(err, cats) {
    //         if (err) {
    //             res.json({info: 'error during find cats', error: err});
    //         };
    //         res.json({info: 'cats found successfully', data: cats});
    //     });
    // });
    
    
}



