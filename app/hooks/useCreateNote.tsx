import { NoteProps, useNotesSlice } from "../contexts/notesSlice";
import { useOfflineDatabase } from "../database/offlineDatabase";

export const useCreateNote = () => {
  const { create } =
    useOfflineDatabase();
  const { createNoteAction } = useNotesSlice();
  
  const createNote = async (
    note: NoteProps = {
      id: "",
      title: "",
      content: "",
      updated_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
      synced_at: null,
      is_deleted: false,
      dirty: true,
    }
  ) => {
    try {
      createNoteAction(note);
      await create(note);
    } catch (error) {
      console.error("Error creating note:", error);
      return false;
    }
  };

  return { createNote };
};
