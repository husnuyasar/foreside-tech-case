#!/bin/bash
cd /app/beer_service/

echo "Running npm run db..."
npm run db


echo "Running npm run migrate..."
npm run migrate


echo "Running npm run seed..."
npm run seed

echo "Database setup complete."
npm run start