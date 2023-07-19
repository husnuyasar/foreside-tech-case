require('dotenv').config()
const beerClient = require("./clients/beer.client")
const orderRepository = require('./repository/order.repository');
const bartenders = [];

module.exports.generateBartenders = () => {
    console.log("Bartenders count :", parseInt(process.env.BARTENDER_COUNT))
    const bartenderCount = parseInt(process.env.BARTENDER_COUNT);
    for (let index = 1; index <= bartenderCount; index++) {
        bartenders.push({
            id : index,
            name : `Bartender ${index}`,
            isPouring : false
        })
    }
}

module.exports.process = async(call) => {
    try {
        const beerIds = call.request.beerOrders.map(o=> o.id);
        beerClient.getFilter({beerIds : beerIds}, (err,response)=> {
            if(err) {
                return call.emit('error', err)
            }
            else{
                call.write({status : 0, message :"Order recieved."});
                const beerList = response.result;
                bartender_process(call, beerList)
            }
        })
       
    } catch (error) {
        call.destroy(error)
    }
}

module.exports.getLastOrderRecord = async(call) => {
    try {
        const lastOrder = await orderRepository.getLastOrderRecord();
        const beerList = JSON.parse(lastOrder.orderDetail);
        call.request.beerOrders = beerList;
        await this.process(call);
    } catch (error) {
        call.destroy(error)
    }
}

module.exports.getAll = async(call,callback) => {
    try {
        const orders = await orderRepository.getAll();
        callback(null, {result : orders })
    } catch (error) {
        callback(error);
    }
}

const bartender_process = async(call, beerList)=> {
    const beerOrders = call.request.beerOrders;
    call.write({status : 1, message : 'Process started.'});
    let completedBeers = [];
    const totalOrder = beerOrders.reduce((a,b) => {return a.quantity + b.quantity});
    const preparatedBeers = [];

    const newOrder = {
        orderDetail: JSON.stringify(beerOrders),
        startedAt: new Date(),
    }

    while(completedBeers.length<totalOrder) { 
        const availableBartenders = bartenders.filter((bartender) => !bartender.isPouring);

        if (availableBartenders.length === 0) {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            continue;
        }
        
        const orderedBeers = beerOrders.filter((beer)=>
                {
                    return beer.quantity != 0
                }
            );
        if(orderedBeers.length == 0){
            await new Promise((resolve) => setTimeout(resolve, 1000));
            continue;
        }
        const orderedBeer = orderedBeers.find((beer)=> 
                preparatedBeers.filter(
                    (preparatedBeers)=> {return (preparatedBeers.id === beer.id && preparatedBeers.quantity !== beer.quantity )})
                    || beer
                )
        
        const preparatedBeer = preparatedBeers.find(b=> b.id === orderedBeer.id);
        if(preparatedBeer)
            preparatedBeer.quantity +=1;     
        else
            preparatedBeers.push({
                id : orderedBeer.id,
                quantity : 1
            })
        orderedBeer.quantity -= 1;
        const bartender = availableBartenders.shift();
        bartender.isPouring = true;
        
        const beerToPour = beerList.find(b=> b.id === orderedBeer.id);
        pourBeer(call, beerToPour, bartender, completedBeers)
   
    }
    newOrder["finishedAt"] = new Date();  
    const createdOrder = await orderRepository.createOrder(newOrder);
    call.write({ status: 3, message: "Order is ready!", orderId: createdOrder.id });
    call.end();
}



function pourBeer(call, beer, bartender, completedBeers) {
    return new Promise((resolve) => {
      setTimeout(() => {
        call.write({ status: 2, message : `Beer ${beer.name} is ready`});
        bartender.isPouring = false;
        completedBeers.push(beer)
        resolve(completedBeers);
      }, (beer.bartender_preparation_time*1000)+(beer.pour_time * 1000));
    });
}