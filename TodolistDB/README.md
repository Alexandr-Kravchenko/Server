# Example of REST API using Express
This example shows how to move request handling logic into controllers.

## Controllers
Controllers located at [controllers](controllers) folder. Controller contains methods for all CRUD operations. All methods return a `Promise`.  

Controller knows nothing about Express. 

## Router
In [routes/index.js](routes/index.js) we create RESTful router for each controller and add them to a main router. 


## TODO
* Reduce error handling duplication
* Improve error handling