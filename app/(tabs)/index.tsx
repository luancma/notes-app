import { NotesList } from "@/components/NotesList";
import { useEffect } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { useAuth } from "../contexts/AuthContext";
import { useOfflineDatabase } from "../database/offlineDatabase";
import { supabase } from "../database/supabase";

export default function HomeScreen() {
  const isOnline = true;
  const { create, showAllNotes, showDirtyNotes, markNoteAsSynced } =
    useOfflineDatabase();
  const { session, user } = useAuth();

  useEffect(() => {
    const uploadChangesToSupabase = async () => {
      try {
        const dirtyNotes = await showDirtyNotes();

        for (const note of dirtyNotes) {
          try {
            await supabase
              .from("notes")
              .upsert(note, { onConflict: "id" })
              .then(({ error }) => {
                if (error) {
                  throw new Error(
                    `Failed to upsert note ${note.id}: ${error.message}`
                  );
                }
              });
            console.log(`Note ${note.id} synced successfully.`);
            await markNoteAsSynced(note.id);
          } catch (noteError) {
            console.error(`Failed to sync note ${note.id}:`, noteError);
          }
        }
      } catch (error) {
        console.log("Error uploading changes to Supabase:", error);
      }
    };

    if (isOnline && session && user) {
      uploadChangesToSupabase();
    }
  }, [session, user, isOnline, showAllNotes, markNoteAsSynced]);

  return (
    <View>
      <Text>Welcome to the Notes App!</Text>
      <Text>{isOnline ? "Online" : "Offline"}</Text>
      <Button
        title="Add Note"
        onPress={async () => {
          await create({
            title: "New Note",
            content: "This is a new note created from the home screen.",
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

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
