import { type SQLiteDatabase } from "expo-sqlite";

export async function initializeDatabase(database: SQLiteDatabase) {
  await database.execAsync(
    `CREATE TABLE IF NOT EXISTS notes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        content TEXT,
        updated_at TEXT,
        created_at TEXT NOT NULL,
        synced_at TEXT,
        is_deleted BOOLEAN,
        dirty BOOLEAN
        );
  `)
}
