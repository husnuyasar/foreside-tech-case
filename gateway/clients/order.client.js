const path = require("path")
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
require('dotenv').config()
const PROTO_PATH = path.join(__dirname + "/../protos/order.proto");

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    enums: String,
    longs: String,
    defaults: true,
    oneofs: true,
  });
  
  const orderProto = grpc.loadPackageDefinition(packageDefinition).order;
  
  const orderClient = new orderProto.Order(
    `${process.env.ORDER_SERVICE}:3001`,
    grpc.credentials.createInsecure()
  );
  
  module.exports = orderClient;