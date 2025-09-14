import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, AppState } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudentProfile } from "../redux/userActions";
import { useFocusEffect } from "@react-navigation/native";

export default function StudentDashboard() {
  const dispatch = useDispatch();
  const { profile, profileLoading, profileError } = useSelector((state) => state.user);
  const appState = useRef(AppState.currentState);

  // 🔑 Screen focus hone par refresh
  useFocusEffect(
    React.useCallback(() => {
      dispatch(fetchStudentProfile());
    }, [dispatch])
  );

  // 🔑 App background se foreground aate hi refresh
  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (appState.current.match(/inactive|background/) && nextAppState === "active") {
        dispatch(fetchStudentProfile());
      }
      appState.current = nextAppState;
    });

    return () => subscription.remove();
  }, [dispatch]);

  return (
    <View style={styles.container}>
      {profileLoading && <ActivityIndicator size="large" color="#00965f" />}

      {profileError && (
        <Text style={styles.errorText}>Error: {profileError}</Text>
      )}

      {profile && (
        <ScrollView style={styles.scroll}>
          <Text style={styles.heading}>Welcome, {profile.name || "Student"} 👋</Text>

          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{profile.email}</Text>

          <Text style={styles.label}>Enrolled Courses:</Text>
          {profile.myCourses && profile.myCourses.length > 0 ? (
            profile.myCourses.map((course, idx) => (
              <Text key={idx} style={styles.value}>• {course.name}</Text>
            ))
          ) : (
            <Text style={styles.value}>No courses found</Text>
          )}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5", padding: 16 },
  scroll: { flex: 1 },
  heading: { fontSize: 22, fontWeight: "bold", marginBottom: 12, color: "#164758" },
  label: { fontSize: 16, marginTop: 8, fontWeight: "600", color: "#00965f" },
  value: { fontSize: 15, marginBottom: 4, color: "#333" },
  errorText: { color: "red", fontSize: 14 },
});
