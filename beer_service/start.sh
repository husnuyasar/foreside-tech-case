#!/bin/bash
cd /app/beer_service/
# Run npm run db
echo "Running npm run db..."
npm run db

# Run npm run migrate
echo "Running npm run migrate..."
npm run migrate

# Run npm run seed
echo "Running npm run seed..."
npm run seed

echo "Database setup complete."
npm run start