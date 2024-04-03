const express = require('express');
const fs = require('fs');
const readline = require('readline');
const cors = require('cors');
const app = express();

// Use CORS middleware
app.use(cors({
    origin: ["https://wordle-unlimited-javascript-ibgm.vercel.app"],
}));

// Endpoint to get a random word
app.get('/random-word', (req, res) => {
    const words = [];

    // Read the txt file line by line
    const rl = readline.createInterface({
        input: fs.createReadStream('wordle-bank.txt'),
        output: process.stdout,
        terminal: false
    });

    rl.on('line', (line) => {
        words.push(line.trim());
    });

    rl.on('close', () => {
        if (words.length === 0) {
            return res.status(500).json({ error: "No words found" });
        }
        // Select a random word from the list
        const randomWord = words[Math.floor(Math.random() * words.length)];
        console.log("Random word:", randomWord);

        // Send the random word as the response
        res.json({ word: randomWord });
    });

    rl.on('error', (error) => {
        console.error("Error reading file:", error);
        res.status(500).json({ error: "Internal Server Error" });
    });
});

const PORT = 4001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
