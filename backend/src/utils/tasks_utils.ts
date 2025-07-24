import fs from 'fs';
import { Pool } from 'pg';
import { Task } from '../types/Task';

const DB_NAME = process.env.DB_NAME;

async function tasks_table_exists(pool: Pool): Promise<Boolean> {
    try {
        const result = await pool.query(
            `SELECT table_name FROM information_schema.tables WHERE (table_catalog = '${DB_NAME}') AND (table_schema = 'public')`
        );
        const rows = result.rowCount;
        if (rows) return true;
        return false;
    } catch (err) {
        return false;
    }
}

export async function init_tasks_table(pool: Pool) {
    const tasks_exists: Boolean = await tasks_table_exists(pool);
    if (!tasks_exists) {
        try {
            const sql = fs.readFileSync(
                './db_scripts/create_tasks.sql',
                'utf8'
            );
            await pool.query(sql);

            // Add sample data
            await pool.query(`
                INSERT INTO public.tasks (title) VALUES ('test 1');
                INSERT INTO public.tasks (title) VALUES ('test 2');
                INSERT INTO public.tasks (title) VALUES ('test 3'); `);
        } catch (err) {
            console.error('Error reading file:', err);
        }
    }
}

export async function create_task(pool: Pool, task: Task): Promise<Boolean> {
    const keys = Object.keys(task);
    const columns: string[] = [];
    const values: string[] = [];

    if (keys.includes('title')) {
        columns.push('title');
        values.push(`'${task.title}'` || `''`);
    }
    if (keys.includes('due_date')) {
        columns.push('due_date');
        values.push(`'${task.due_date}'` || 'NULL');
    }
    if (keys.includes('is_completed')) {
        columns.push('is_completed');
        values.push(`${task.is_completed}` || 'false');
    }

    if (columns.length == 0) return false;
    const result = await pool.query(`INSERT INTO public.tasks (${columns.join(', ')}) VALUES (${values.join(', ')})`);
    if (result.rowCount) return true;
    return false;
}

export async function delete_task(
    pool: Pool,
    id: number | string
): Promise<Boolean> {
    try {
        const result = await pool.query(
            `DELETE FROM public.tasks WHERE (id = ${id})`
        );
        const rows = result.rowCount;
        if (rows) return true;
        return false;
    } catch (err) {
        return false;
    }
}

export async function get_task(
    pool: Pool,
    id: number | string
): Promise<Task | null> {
    try {
        const result = await pool.query(
            `SELECT * FROM public.tasks WHERE (id = ${id}) LIMIT 1`
        );
        const rows = result.rows;
        if (rows) return rows[0];
        return null;
    } catch (err) {
        return null;
    }
}

export async function get_tasks(pool: Pool): Promise<Task[]> {
    try {
        const result = await pool.query(
            'SELECT * FROM public.tasks ORDER BY id ASC'
        );
        return result.rows;
    } catch (err) {
        return [];
    }
}
