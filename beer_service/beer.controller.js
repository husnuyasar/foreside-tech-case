const grpc = require("@grpc/grpc-js");
const BeerRepository = require('./repository/beer.repository');
const beerRepository = new BeerRepository();
const beerList = [
    { id : 1, name: 'Efes', bartender_preparation_time: 5, volume: 500, pour_time: 5},
    { id : 2, name: 'Heineken', bartender_preparation_time: 6, volume: 500, pour_time: 5},
    { id : 3, name: 'Corona', bartender_preparation_time: 19, volume: 300, pour_time: 3},
]
module.exports.getAll = async({request}, callback) => {
    try {
        const beers = await beerRepository.getAll();
        callback(null, {result : beers })
    } catch (error) {
        callback(error);
    }
}

module.exports.get = async({request}, callback) => {
    try {
        const beer = await beerRepository.get(request.beerId);
        console.log("beer :",beer);
        callback(null, beer);
    } catch (error) {
        callback(error);
    }
}

module.exports.getFilter = async(call, callback) => {
    try {
        const filter = call.request.beerIds;
        const beers = await beerRepository.getAll(filter);
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