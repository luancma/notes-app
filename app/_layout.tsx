import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { Suspense } from "react";
import { ActivityIndicator } from "react-native";
import { AuthProvider } from "./contexts/AuthContext";
import { initializeDatabase } from "./database/initDatabase";

export default function RootLayout() {
  return (
    <Suspense fallback={<ActivityIndicator size="large" />}>
      <AuthProvider>
        <SQLiteProvider
          databaseName="myDatabase.db"
          onInit={initializeDatabase}
        >
          <Stack>
            <Stack.Screen name="index" options={{ title: "Tasks" }} />
          </Stack>
        </SQLiteProvider>
      </AuthProvider>
    </Suspense>
  );
}
