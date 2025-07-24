import cors from 'cors';
import express, { Request, Response } from 'express';
import { Pool } from 'pg';

import {
    init_tasks_table,
    delete_task,
    get_task,
    get_tasks,
} from './utils/tasks_utils';
import { Task } from './types/Task';

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

// DELETE a single Task by ID
app.delete('/tasks/:id', async (req: Request, res: Response) => {
    const result: Boolean = await delete_task(pool, req.params.id);
    if (result) {
        res.status(200).send('Task deleted');
    } else {
        res.status(404).send({ error: 'Task not found' });
    }
});

// GET all Tasks
app.get('/tasks', async (req: Request, res: Response) => {
    const tasks: Task[] = await get_tasks(pool);
    res.status(200).json(tasks);
});

// GET a single Task by ID
app.get('/tasks/:id', async (req: Request, res: Response) => {
    const task: Task | null = await get_task(pool, req.params.id);
    if (task) {
        res.json(task);
    } else {
        res.status(404).send({ error: 'Task not found' });
    }
});

// Handle request for non-existent routes
app.use((req, res, next) => {
    res.status(404).send({ error: 'Route not found' });
});

// Start the server
app.listen(port, async () => {
    console.log(`Server running on http://localhost:${port}`);

    await init_tasks_table(pool);
});
