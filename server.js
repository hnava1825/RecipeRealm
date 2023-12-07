const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

const CACHE_TTL = 10 * 60 * 1000; // 10 minutes
const cache = {};

require('dotenv').config();
// Replace with your actual API endpoint
const appid = process.env.APP_ID;
const appKey = process.env.APP_KEY;
const baseUrl = `https://api.edamam.com/api/recipes/v2?type=public&app_id=${appid}&app_key=${appKey}`;

// Use CORS middleware
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello, World!'); // Replace with your desired response
});


app.listen(3001, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
