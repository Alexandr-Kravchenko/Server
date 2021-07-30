# Example of REST API using Express
This example shows how to move request handling logic into controllers.

## Controllers
Controllers located at [controllers](controllers) folder. Controller contains methods for all CRUD operations. All methods return a `Promise`.  

[controllers/index.js](controllers/index.js) gather all controller instances in one module and use desired path as a key. 

Controller knows nothing about Express. 

## Router
In [routes/index.js](routes/index.js) we create RESTful router for each controller and add them to a main router. 

[routes/restful-router.js](routes/restful-router.js) creates a router for controller. It register RESTful request handlers that delegates execution to a corresponding controller's method. 

## TODO
* Reduce error handling duplication
* Improve error handling