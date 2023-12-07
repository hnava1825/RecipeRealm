const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Your API key and other configurations
const YOUR_API_KEY = 'YOUR_API_KEY'; // Replace with your actual API key
const baseUrl = `https://api.edamam.com/search?app_id=YOUR_APP_ID&app_key=${YOUR_API_KEY}`;
const CACHE_TTL = 3600000; // Cache TTL in milliseconds (1 hour)
const cache = {}; // Cache object to store responses

// Route to fetch recipes
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

// Serve static files (e.g., HTML, CSS, JavaScript)
app.use(express.static('public'));

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
