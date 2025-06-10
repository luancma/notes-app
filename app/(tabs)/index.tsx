import { NotesList } from "@/components/NotesList";
import { useEffect } from "react";
import { Button, Text, View } from "react-native";
import base64 from 'react-native-base64';
import { useAuth } from "../contexts/AuthContext";
import { useCreateNote } from "../hooks/useCreateNote";
import { useFetchNotes } from "../hooks/useFetchNotes";


export default function HomeScreen() {
  const { createNote } = useCreateNote();
  const isOnline = true;
  const { session, user } = useAuth();
  const { notes, fetchNotes } = useFetchNotes();

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <View>
      <Text>Welcome to the Notes App!</Text>
      <Text>{isOnline ? "Online" : "Offline"}</Text>
      <Button
        title="Add Note"
        onPress={async () => {
          const base64EncodedUser = base64.encode(JSON.stringify(new Date()));
          console.log("Base64 Encoded User:", base64EncodedUser);
          createNote({
            id: base64EncodedUser,
            title: `Note`,
            content: `This is the content of note.`,
            updated_at: new Date().toISOString(),
            created_at: new Date().toISOString(),
            synced_at: null,
            is_deleted: false,
            dirty: true,
          });
        }}
      />
      <NotesList />
    </View>
  );
}
