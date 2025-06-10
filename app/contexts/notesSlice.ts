import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface NoteProps {
  id: string;
  title: string;
  content: string;
  updated_at: string;
  created_at: string;
  synced_at: string | null;
  is_deleted: boolean;
  dirty: boolean;
}
export interface NotesProps {
  notes: NoteProps[];
  createNoteAction: (note: NoteProps) => void;
  deleteNoteAction: (id: string) => void;
}

const useNotesSlice = create<NotesProps>()(
  persist(
    (set) => ({
      notes: [],
      createNoteAction: (note) =>
        set((state) => ({
          notes: [...state.notes, note],
        })),
      deleteNoteAction: (id) =>
        set((state) => ({
          notes: state.notes.filter((note) => note.id !== id),
        })),
    }),
    {
      name: "notes-storage",
    }
  )
);

export { useNotesSlice };
