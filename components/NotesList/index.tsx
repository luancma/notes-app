import {
  NotesDatabase,
  useOfflineDatabase,
} from "@/app/database/offlineDatabase";
import React from "react";
import { Button, Text, View } from "react-native";

export const NotesList = () => {
  const { showAllNotes, deleteNote } = useOfflineDatabase();
  const [notes, setNotes] = React.useState<NotesDatabase[]>([]);

  React.useEffect(() => {
    const fetchNotes = async () => {
      try {
        const notes = await showAllNotes();
        setNotes(notes);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };
    fetchNotes();
  }, []);

  console.log(notes);

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
              try {
                await deleteNote(note.id);
                setNotes((prevNotes) =>
                  prevNotes.filter((n) => n.id !== note.id)
                );
              } catch (error) {
                console.error("Error deleting note:", error);
              }
            }}
          />
        </View>
      ))}
    </View>
  );
};
