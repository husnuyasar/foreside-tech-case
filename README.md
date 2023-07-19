# GRPC Microservices Project README

This repository contains three microservices built using Node.js, Express.js, and gRPC for communication. The microservices are as follows:

1. **Gateway**
   - Project Directory: `gateway/`
   - Description: An Express.js project that acts as a gateway and sends requests to the beer and order services via gRPC.

2. **Beer Service**
   - Project Directory: `beer_service/`
   - Description: A gRPC-based microservice that provides CRUD operations for managing beers.

3. **Order Service**
   - Project Directory: `order_service/`
   - Description: A gRPC-based microservice that handles order-related operations.

## Project Setup

Before running the microservices, make sure you have Docker and Docker Compose installed on your system.

### Permission the Start Script For Beer Service

In the `beer_service/` directory, there is a `start.sh` file that needs to be made executable. To do this, run the following command:

```bash
chmod +x beer_service/start.sh
```

## Running the Microservices

To start the microservices, use the following command:

```bash
docker-compose up -d
```

The above command will spin up containers for the gateway, beer service, and order service. They will communicate with each other over the network defined in the Docker Compose file.

## Testing Endpoints
Once the containers are up and running, you can test the following endpoints using Postman or any other HTTP client:

- **GET http://localhost:3000/beer** -> Get all beers.
- **GET http://localhost:3000/beer/:id** -> Get a specific beer by ID.
- **GET http://localhost:3000/order** -> Get all orders.
- **POST http://localhost:3000/order** -> Place an order. The request body should be in the following format:

```json
{
  "beerRequest": [
    {
      "id": 11,
      "quantity": 2
    },
    {
      "id": 7,
      "quantity": 4
    }
  ]
}
```
- **GET http://localhost:3000/order/repeat** -> Repeat the last order.

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
