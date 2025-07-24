import cors from 'cors';
import express from 'express';

const app = express();
app.use(cors());
app.use(express.json()); // Parse JSON bodies

// Get ENV Variables
const port = process.env.PORT;

// Handle request for non-existent routes
app.use((req, res, next) => {
    res.status(404).send('Route not found');
});

// Start the server
app.listen(port, async () => {
    console.log(`Server running on http://localhost:${port}`);
});
