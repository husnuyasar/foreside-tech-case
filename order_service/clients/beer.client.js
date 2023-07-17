const path = require("path")
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const PROTO_PATH = path.join(__dirname + "/../protos/beer.proto");

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    enums: String,
    longs: String,
    defaults: true,
    oneofs: true,
  });
  
  const beerProto = grpc.loadPackageDefinition(packageDefinition).beer;
  
  const beerClient = new beerProto.Beer(
    "0.0.0.0:3002",
    grpc.credentials.createInsecure()
  );
  
  module.exports = beerClient;