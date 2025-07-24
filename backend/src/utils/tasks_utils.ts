import fs from 'fs';
import { Pool } from 'pg';

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
