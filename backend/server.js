const express = require('express');
const cors = require('cors');

const app = express();

// Use CORS middleware
app.use(cors({
    origin: ["https://wordle-unlimited-javascript-ibgm.vercel.app"],
}));

// Array of words
const words = [
    "apple",
    "banana",
    "orange",
    "grape",
    // Add more words as needed
];

// Endpoint to get a random word
app.get('/random-word', (req, res) => {
    if (words.length === 0) {
        return res.status(500).json({ error: "No words found" });
    }

    // Select a random word from the list
    const randomWord = words[Math.floor(Math.random() * words.length)];
    console.log("Random word:", randomWord);

    // Send the random word as the response
    res.json({ word: randomWord });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
