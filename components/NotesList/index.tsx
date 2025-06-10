import {
  useOfflineDatabase
} from "@/app/database/offlineDatabase";
import { useFetchNotes } from "@/app/hooks/useFetchNotes";
import React from "react";
import { Button, Text, View } from "react-native";

export const NotesList = () => {
  const { deleteNote } = useOfflineDatabase();
  const { notes } = useFetchNotes();

  console.log(111, notes);
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
              await deleteNote(note.id);
            }}
          />
        </View>
      ))}
    </View>
  );
};
