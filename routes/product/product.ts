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
        },
        {
            "name" :"thinkpad",
            "category" :"laptop",
            "manufacturer" :"Lenovo",
            "price" : 699.99
        },
        {
            "name" :"surface book",
            "category" :"hybrid",
            "manufacturer" :"Microsoft",
            "price" : 1750.99
        },
        {
            "name" :"surface tablet",
            "category" :"tablet",
            "manufacturer" :"Microsoft",
            "price" : 1150.99
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
       
        
    app.get('/product/:name', function (req, res) {
        
        let items =_.filter(_products, { 'name': req.params.name })
        let err = null;        
            
        if (items.length ==0) {
            res.json({info: 'error during find products', error: err});
        };
        res.json({info: 'products found successfully', data: items});
        
    });
    
    app.get('/product/category/:category', function (req, res) {
        res.send(_.filter(_products, { 'category': req.params.category }) );
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



