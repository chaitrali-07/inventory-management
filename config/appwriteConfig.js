// config/appwriteConfig.js

const { Client, Storage, Databases, ID } = require('node-appwrite');
require('dotenv').config();

// Initialize the Appwrite client
const client = new Client();

client
  .setEndpoint(process.env.APPWRITE_ENDPOINT) // e.g. 'http://localhost/v1' or Appwrite cloud URL
  .setProject(process.env.APPWRITE_PROJECT_ID) // your Appwrite project ID
  .setKey(process.env.APPWRITE_API_KEY);      // API key from Appwrite console

// Optional services (export as needed)
const storage = new Storage(client);
const databases = new Databases(client);

module.exports = { client, storage, databases, ID };
