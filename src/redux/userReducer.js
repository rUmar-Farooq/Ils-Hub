// redux/userReducer.js

const initialState = {
  isLoggedIn: false,
  role: null,
  user: null,
  token: null, // <— store token here
  loading: false,
  error: null,

  forgotSuccess: false,

  profile: null,
  profileLoading: false,
  profileError: null,

  dashboardLoading: false,
  dashboardError: null,
  courses: [],
  lectures: [],
  projects: [],
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case "SELECT_ROLE":
      return { ...state, role: action.payload, error: null };

    case "LOGIN_REQUEST":
      return { ...state, loading: true, error: null };

    case "LOGIN_SUCCESS":
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload.user,
        token: action.payload.token,
        loading: false,
        error: null,
      };

    case "LOGIN_FAILURE":
      return { ...state, loading: false, error: action.payload };

    case "LOGOUT":
      return initialState;

    case "FORGOT_REQUEST":
      return { ...state, loading: true, error: null, forgotSuccess: false };

    case "FORGOT_SUCCESS":
      return { ...state, loading: false, forgotSuccess: true };

    case "FORGOT_FAILURE":
      return { ...state, loading: false, error: action.payload, forgotSuccess: false };

    case "PROFILE_REQUEST":
      return { ...state, profileLoading: true, profileError: null };

    case "PROFILE_SUCCESS":
      return { ...state, profile: action.payload, profileLoading: false, profileError: null };

    case "PROFILE_FAILURE":
      return { ...state, profileLoading: false, profileError: action.payload };

    case "DASHBOARD_LOADING":
      return { ...state, dashboardLoading: true, dashboardError: null };

    case "DASHBOARD_SUCCESS":
      return {
        ...state,
        dashboardLoading: false,
        dashboardError: null,
        profile: action.payload.profile,
        courses: action.payload.courses,
        lectures: action.payload.lectures,
        projects: action.payload.projects,
      };

    case "DASHBOARD_FAILURE":
      return { ...state, dashboardLoading: false, dashboardError: action.payload };

    default:
      return state;
  }
}
