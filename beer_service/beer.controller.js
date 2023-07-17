const grpc = require("@grpc/grpc-js");

const beerList = [
    { id : 1, name: 'Efes', bartender_preparation_time: 5, volume: 500, pour_time: 5},
    { id : 2, name: 'Heineken', bartender_preparation_time: 6, volume: 500, pour_time: 5},
    { id : 3, name: 'Corona', bartender_preparation_time: 19, volume: 300, pour_time: 3},
]
module.exports.getAll = async({request}, callback) => {
    try {
        callback(null, {result : beerList })
    } catch (error) {
        callback(error);
    }
}

module.exports.get = async({request}, callback) => {
    try {
        const beer = beerList.find(b=> b.id == request.beerId);
        console.log("beer :",beer);
        callback(null, beer);
    } catch (error) {
        callback(error);
    }
}

module.exports.getFilter = async(call, callback) => {
    try {
        const beers = beerList.filter(b=> call.request.beerIds.includes(b.id));
        if(beers.length == 0 || beers.length != call.request.beerIds.length){
            callback({
                message: 'Beer not found',
                code: grpc.status.INVALID_ARGUMENT
            })
        }
          
        console.log("beers :",beers);
        callback(null, {result : beers });
    } catch (error) {
        callback(error);
    }
}