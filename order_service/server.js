const path = require("path")
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const {process,generateBartenders} = require("./order.controller")
const PROTO_PATH = path.join(__dirname + "/protos/order.proto");

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    enums: String,
    longs: String,
    defaults: true,
    oneofs: true,
})
const orderProto = grpc.loadPackageDefinition(packageDefinition).order;
const server = new grpc.Server();
server.addService(orderProto.Order.service, {
    process: process
})
server.bindAsync(
    "0.0.0.0:3001",
    grpc.ServerCredentials.createInsecure(),
    () => {
        generateBartenders();
        console.log("[ORDER SERVICE] running on 3001");
        server.start();
    }
)