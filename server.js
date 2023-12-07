const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;

const CACHE_TTL = 10 * 60 * 1000; // 10 minutes
const cache = {};

require('dotenv').config();
// Replace with your actual API endpoint
const appid = process.env.APP_ID;
const appKey = process.env.APP_KEY;
const baseUrl = `https://api.edamam.com/api/recipes/v2?type=public&app_id=${appid}&app_key=${appKey}`;

// Use CORS middleware
app.use(cors());

app.get('/recipes', async (req, res) => {
    const type = req.query.type || 'Meal Prep';
    const url = `${baseUrl}&q=${type}`;

    // Use cached data if available
    if (cache[url] && (Date.now() - cache[url].timestamp) < CACHE_TTL) {
        return res.json(cache[url].data);
    }

    try {
        const apiRes = await fetch(url);
        const data = await apiRes.json();
        cache[url] = { data, timestamp: Date.now() };
        res.json(data);
    } catch (error) {
        console.error("Error fetching recipes:", error);
        res.status(500).json({ error: 'Failed to fetch recipes.' });
    }
});

app.listen(3001, (https://reciperealm-gky2.onrender.com/) => {
    console.log(`Server running on http://localhost:${PORT}`);
});
