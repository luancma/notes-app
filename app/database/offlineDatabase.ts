import { useSQLiteContext } from "expo-sqlite";

export type NotesDatabase = {
  id: number;
  title: string;
  content: string;
  is_deleted: boolean; // Optional, if you want to track deletion status
  dirty: boolean; // Optional, if you want to track if the note is unsynced
  updated_at: string | null; // Optional, if you want to track last update time
  created_at: string | null; // Optional, if you want to track creation time
  synced_at: string | null; // Optional, if you want to track last sync time
};

export function useOfflineDatabase() {
  const database = useSQLiteContext();

  const showAllNotes = async () => {
    try {
      const query = `SELECT * FROM notes`;
      const result = await database.getAllAsync<NotesDatabase>(query);
      return result;
    } catch (error) {
      console.error("Error fetching notes:", error);
      throw error;
    }
  };

   const showDirtyNotes = async () => {
    try {
      const query = `SELECT * FROM notes WHERE dirty = 1`;
      const result = await database.getAllAsync<NotesDatabase>(query);
      return result;
    } catch (error) {
      console.error("Error fetching dirty notes:", error);
      throw error;
    }
  };

  async function markNoteAsSynced(id: number) {
    const statement = await database.prepareAsync(
      "UPDATE notes SET dirty = 0, synced_at = $synced_at WHERE id = $id"
    );
    try {
      await statement.executeAsync({
        $id: id,
        $synced_at: new Date().toISOString(),
      });
      console.log(`Note ${id} marked as synced.`);
    } catch (error) {
      console.error("Error marking note as synced:", error);
      throw error;
    } finally {
      await statement.finalizeAsync();
    }
  }

  async function create(data: Omit<NotesDatabase, "id">) {
    const statement = await database.prepareAsync(
      "INSERT INTO notes (title, content, created_at, updated_at, synced_at, is_deleted, dirty) VALUES ($title, $content, $created_at, $updated_at, $synced_at, $is_deleted, $dirty)"
    );

    try {
      const result = await statement.executeAsync({
        $title: data.title,
        $content: data.content,
        $created_at: new Date().toISOString(),
        $updated_at: new Date().toISOString(),
        $synced_at: null,
        $is_deleted: data.is_deleted ?? false,
        $dirty: true,
      });

      const insertedRowId = result.lastInsertRowId
        ? result.lastInsertRowId.toString()
        : null;

      return { insertedRowId };
    } catch (error) {
      console.error("Error creating note:", error);
      throw error;
    } finally {
      await statement.finalizeAsync();
    }
  }

  const deleteNote = async (id: number) => {
    const statement = await database.prepareAsync(
      "DELETE FROM notes WHERE id = $id"
    );
    try {
      await statement.executeAsync({ $id: id });
    } catch (error) {
      console.error("Error deleting note:", error);
      throw error;
    } finally {
      await statement.finalizeAsync();
    }
  };

  return {
    showAllNotes,
    create,
    deleteNote,
    markNoteAsSynced,
    showDirtyNotes
  };
}
