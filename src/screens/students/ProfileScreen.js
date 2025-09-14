import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudentProfile } from "../../redux/userActions";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { MotiView } from "moti";

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { profile, profileLoading, profileError } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    dispatch(fetchStudentProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profile?.name) {
      navigation.setOptions({ title: profile.name });
    }
  }, [profile, navigation]);

  if (profileLoading)
    return (
      <LinearGradient colors={["#164758", "#00965f"]} style={styles.container}>
        <ActivityIndicator size="large" color="#fff" />
      </LinearGradient>
    );

  if (profileError)
    return (
      <LinearGradient colors={["#164758", "#00965f"]} style={styles.container}>
        <Text style={styles.error}>{profileError}</Text>
      </LinearGradient>
    );

  if (!profile)
    return (
      <LinearGradient colors={["#164758", "#00965f"]} style={styles.container}>
        <Text style={styles.error}>No profile data found.</Text>
      </LinearGradient>
    );

  return (
    <LinearGradient colors={["#164758", "#00965f"]} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <MotiView
          from={{ opacity: 0, translateY: 30 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", duration: 600 }}
          style={styles.card}
        >
          {/* Header: Avatar + Name */}
          <View style={styles.headerRow}>
            <Image
              source={{
                uri:
                  profile.profilePic ||
                  "https://ui-avatars.com/api/?name=" +
                    encodeURIComponent(profile.name || "Student"),
              }}
              style={styles.avatar}
            />
            <Text style={styles.name}>{profile.name}</Text>
          </View>

          {/* Info Grid */}
          <View style={styles.infoBox}>
            <InfoRow icon="mail-outline" label="Email" value={profile.email} />
            <InfoRow
              icon="call-outline"
              label="Phone"
              value={profile.phone || "N/A"}
            />
            <InfoRow
              icon="school-outline"
              label="Enrollment No"
              value={profile.enrollmentNo || "N/A"}
            />
            <InfoRow
              icon="book-outline"
              label="Course"
              value={profile.courseName || "N/A"}
            />
            <InfoRow
              icon="calendar-outline"
              label="Batch"
              value={profile.batch || "N/A"}
            />
            <InfoRow
              icon="checkmark-circle-outline"
              label="Status"
              value={profile.status || "N/A"}
            />
          </View>
        </MotiView>
      </ScrollView>
    </LinearGradient>
  );
};

const InfoRow = ({ icon, label, value }) => (
  <View style={styles.row}>
    <View style={styles.iconCircle}>
      <Ionicons name={icon} size={20} color="#fff" />
    </View>
    <View style={{ flex: 1 }}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    width: "95%",
    maxWidth: 400,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#eee",
  },
  name: {
    fontSize: 22,
    fontWeight: "700",
    color: "#164758",
    marginLeft: 16,
  },

  infoBox: {
    width: "100%",
    marginTop: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
    backgroundColor: "rgba(0,150,95,0.1)",
    borderRadius: 12,
    padding: 12,
  },
  iconCircle: {
    backgroundColor: "#00965f",
    borderRadius: 20,
    padding: 6,
    marginRight: 12,
  },
  label: { fontSize: 14, fontWeight: "600", color: "#164758" },
  value: { fontSize: 14, color: "#164758", marginTop: 2 },
  error: { color: "#fff", fontSize: 16 },
});

export default ProfileScreen;
