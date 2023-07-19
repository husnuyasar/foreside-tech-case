const mongoose = require('mongoose');
const config = require('./config');

class MongoDB {
  constructor() {
    this.connected = false;
  }

  async connect() {
    if (this.connected) return;

    try {
      await mongoose.connect(config.database, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      console.log('Connected to MongoDB.');
      this.connected = true;
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
    }
  }

  async close() {
    if (!this.connected) return;

    try {
      await mongoose.disconnect();
      console.log('Disconnected from MongoDB.');
      this.connected = false;
    } catch (error) {
      console.error('Error disconnecting from MongoDB:', error);
    }
  }
}

module.exports = new MongoDB();