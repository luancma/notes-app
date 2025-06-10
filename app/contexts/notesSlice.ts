import { create } from "zustand";

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
  removeNote: (id: string) => void;
}

const useNotesSlice = create<NotesProps>()((set) => ({
  notes: [],
  createNoteAction: (notes) =>
    set((state) => ({ notes: { ...state.notes, ...notes } })),
  removeNote: (id) =>
    set((state) => ({
      notes: state.notes.filter((note) => note.id !== id),
    })),
}));

export { useNotesSlice };
