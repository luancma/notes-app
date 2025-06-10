import { useCallback, useState } from "react";
import { NotesDatabase, useOfflineDatabase } from "../database/offlineDatabase";

export const useFetchNotes = () => {
  const { showAllNotes } = useOfflineDatabase();
  const [notes, setNotes] = useState<NotesDatabase[]>([]);

  const fetchNotes = useCallback(async () => {
    try {
      const notes = await showAllNotes();
      setNotes(notes);
      console.log("Fetched notes:", notes);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  }, [showAllNotes]);

  return { notes, fetchNotes };
};
