import { useNotesSlice } from "@/app/contexts/notesSlice";
import { useOfflineDatabase } from "@/app/database/offlineDatabase";
import { useDeleteNote } from "@/app/hooks/useDeleteNote";
import React from "react";
import { Button, Text, View } from "react-native";

export const NotesList = () => {
  const { deleteNote } = useOfflineDatabase();
  const { execute } = useDeleteNote();
  const { notes } = useNotesSlice();

  return (
    <View>
      {notes.map((note) => (
        <View key={note.id}>
          <Text>{note.id}</Text>
          <Text>{note.title}</Text>
          <Text>{note.content}</Text>
          <Button
            title="Delete Note"
            onPress={async () => {
              execute(note.id);
            }}
          />
        </View>
      ))}
    </View>
  );
};
