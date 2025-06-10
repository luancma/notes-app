import { useNotesSlice } from "../contexts/notesSlice";
import { useOfflineDatabase } from "../database/offlineDatabase";

export const useDeleteNote = () => {
  const { create } = useOfflineDatabase();
  const { deleteNoteAction } = useNotesSlice();

  const execute = async (id: string) => {
    try {
      deleteNoteAction(id);
    } catch (error) {
      console.error("Error creating note:", error);
      return false;
    }
  };

  return { execute };
};
