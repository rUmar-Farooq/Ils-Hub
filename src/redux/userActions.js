import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE = "http://localhost:8080/api/offline-course";

// -------- PROFILE / DASHBOARD --------
export const fetchStudentProfile = () => async (dispatch, getState) => {
  dispatch({ type: "PROFILE_REQUEST" });
  try {
    const token = getState().user.token;
    const res = await fetch(`${API_BASE}/get-offline-student-details`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
    if (!res.ok) throw new Error("Failed to fetch profile");
    const data = await res.json();
    const profile = data.student || data;

    dispatch({ type: "PROFILE_SUCCESS", payload: profile });
  } catch (err) {
    dispatch({ type: "PROFILE_FAILURE", payload: err.message });
  }
};

export const fetchStudentDashboardData = () => async (dispatch, getState) => {
  dispatch({ type: "DASHBOARD_LOADING" });
  try {
    const token = getState().user.token;
    const profileRes = await fetch(`${API_BASE}/get-offline-student-details`, {
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
    if (!profileRes.ok) throw new Error("Failed to fetch dashboard");
    const profileData = await profileRes.json();
    const profile = profileData.student || profileData;

    const courses = profile?.myCourses || [];
    const lectures = profile?.lectures || [];
    const projects = profile?.projects || [];

    dispatch({
      type: "DASHBOARD_SUCCESS",
      payload: { profile, courses, lectures, projects },
    });
  } catch (err) {
    dispatch({ type: "DASHBOARD_FAILURE", payload: err.message });
  }
};

// -------- AUTH --------
export const loginUser = (email, password) => async (dispatch) => {
  dispatch({ type: "LOGIN_REQUEST" });
  try {
    const role = "Student";
    const res = await fetch(`${API_BASE}/offline-student-login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, role }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Login failed. Try again.");
    }

    const token = data.token || data?.payload?.token;
    const student = data.student || data?.payload?.student || {};
    if (!token) throw new Error("Token not received from server");

    const user = { ...student, email: student.email || email, role };

    dispatch({ type: "LOGIN_SUCCESS", payload: { user, token } });

    // Save token to AsyncStorage
    await AsyncStorage.setItem('token', token);

    // Profile load
    await dispatch(fetchStudentProfile());
  } catch (error) {
    dispatch({ type: "LOGIN_FAILURE", payload: error.message || "Login failed" });
  }
};

export const logoutUser = () => async (dispatch) => {
  await AsyncStorage.removeItem('token'); // remove saved token
  dispatch({ type: "LOGOUT" });
};

export const loadUserFromStorage = () => async (dispatch) => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      dispatch({ type: "LOGIN_SUCCESS", payload: { user: null, token } });
      await dispatch(fetchStudentProfile());
    }
  } catch (err) {
    console.log('Failed to load token from storage', err);
  }
};

export const forgotPassword = (input) => async (dispatch) => {
  dispatch({ type: "FORGOT_REQUEST" });
  try {
    await new Promise((res) => setTimeout(res, 1000));
    dispatch({ type: "FORGOT_SUCCESS" });
  } catch (error) {
    dispatch({ type: "FORGOT_FAILURE", payload: "Failed to send reset link." });
  }
};
