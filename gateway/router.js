const express = require("express");
const bodyParser = require('body-parser')
const beerClient = require("./clients/beer.client")
const orderClient = require("./clients/order.client")

var jsonParser = bodyParser.json()

module.exports = (app) => {
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: false,
    })
  );

  app.get("/healthz", (req,res)=> {
    res.end("Service is working!")
  })

  app.get("/beer", (req, res)=> {
    beerClient.getAll({}, (err,response)=> {
      if(err) return res.status(400).send(err);
      return res.send(response.result);
    })
  })

  app.get("/beer/:id", (req, res)=> {
    beerClient.get({beerId : req.params.id}, (err,response)=> {
      if(err) return res.status(400).send(err);
      return res.send(response);
    })
  })

  app.post("/order", jsonParser, (req, res)=> {
    const call = orderClient.process({ beerOrders : req.body.beerRequest });
    let error;
    let orderId;
    call.on('error',(err)=> {
      console.log('Error!');
      error = err;
    })
    call.on('data', (statusUpdate) => {
        console.log('Order status changed:');
        console.log(statusUpdate);
        if(statusUpdate.orderId)
          orderId = statusUpdate.orderId;
    });
    call.on('end', () => {
      if(error)
        return res.status(500).send(error)
      console.log('Processing done.');
      res.send(`Order ready! Id: ${orderId}`)
    });
  })

  app.get("/order", (req, res)=> {
    orderClient.getAll({}, (err, response) => {
      if(err) return res.status(400).send(err);
      return res.send(response.result);
    })
  })

  app.get("/order/repeat", (req, res)=> {
    const call = orderClient.repeatPreviousOrder({});
    let error;
    let orderId;
    call.on('error',(err)=> {
      console.log('Error!');
      error = err;
    })
    call.on('data', (statusUpdate) => {
        console.log('Order status changed:');
        console.log(statusUpdate);
        if(statusUpdate.orderId)
          orderId = statusUpdate.orderId;
    });
    call.on('end', () => {
      if(error)
        return res.status(500).send(error)
      console.log('Processing done.');
      res.send(`Order ready! Id: ${orderId}`)
    });
  })
};