import { type SQLiteDatabase } from "expo-sqlite";

export async function initializeDatabase(database: SQLiteDatabase) {
  // Create the new notes table
  await database.execAsync(
    `CREATE TABLE IF NOT EXISTS notes (
        id TEXT PRIMARY KEY NOT NULL,
        title TEXT NOT NULL,
        content TEXT,
        updated_at TEXT,
        created_at TEXT NOT NULL,
        synced_at TEXT,
        is_deleted BOOLEAN,
        dirty BOOLEAN
    );`
  );
}