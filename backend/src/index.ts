import cors from 'cors';
import express from 'express';
import { Pool } from 'pg';

import {
    init_tasks_table,
} from './utils/tasks_utils';

const app = express();
app.use(cors());
app.use(express.json()); // Parse JSON bodies

// Get ENV Variables
const port = process.env.PORT;
const DB_HOST = process.env.DB_HOST;
const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_PORT = parseInt(process.env.DB_PORT || '3000');

// Get connection to DB
const pool = new Pool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    port: DB_PORT,
    idleTimeoutMillis: 30000,
});

// Handle request for non-existent routes
app.use((req, res, next) => {
    res.status(404).send('Route not found');
});

// Start the server
app.listen(port, async () => {
    console.log(`Server running on http://localhost:${port}`);

    await init_tasks_table(pool);
});
