const path = require("path")
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const {get, getAll, getFilter} = require("./beer.controller")
const PROTO_PATH = path.join(__dirname + "/protos/beer.proto");


const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    enums: String,
    longs: String,
    defaults: true,
    oneofs: true,
})

const beerProto = grpc.loadPackageDefinition(packageDefinition).beer;
const server = new grpc.Server();
server.addService(beerProto.Beer.service, {
    getAll : getAll,
    get : get,
    getFilter : getFilter
})
server.bindAsync(
    "0.0.0.0:3002",
    grpc.ServerCredentials.createInsecure(),
    () => {
        console.log("[BEER SERVICE] running on 3002");
        server.start();
    }
)