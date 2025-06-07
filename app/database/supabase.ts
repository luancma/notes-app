import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import "react-native-url-polyfill/auto";

const supabaseUrl = "https://zhqpfjlqrrhjkcerbank.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpocXBmamxxcnJoamtjZXJiYW5rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg3ODUxNzAsImV4cCI6MjA2NDM2MTE3MH0.s4Ca--S5YCQy_Z6NTxNxtWJw6X4gg4ds18ymYN0oVTk";

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  }
});
