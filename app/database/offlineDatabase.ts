import { useSQLiteContext } from "expo-sqlite";
import { NoteProps } from "../contexts/notesSlice";

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

  async function create(data: NoteProps) {
    const statement = await database.prepareAsync(
      "INSERT INTO notes (id, title, content, created_at, updated_at, synced_at, is_deleted, dirty) VALUES ($id, $title, $content, $created_at, $updated_at, $synced_at, $is_deleted, $dirty)"
    );

    console.log("Creating note with data:", data);

    try {
      const result = await statement.executeAsync({
        $id: data.id,
        $title: data.title,
        $content: data.content,
        $created_at: data.created_at,
        $updated_at: data.updated_at,
        $synced_at: data.synced_at,
        $is_deleted: data.is_deleted,
        $dirty: data.dirty,
      });

      const insertedRowId = result.lastInsertRowId
        ? result.lastInsertRowId.toString()
        : null;

      if (!insertedRowId) {
        throw new Error("Failed to insert note, no row ID returned.");
      }

      

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
