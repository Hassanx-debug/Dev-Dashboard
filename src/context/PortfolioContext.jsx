import { createContext, useContext, useReducer, useEffect, useCallback } from "react";
import defaultData from "../data/defaultData";

const PortfolioContext = createContext(null);

const STORAGE_KEY = "hbn-portfolio-data";
const RESUME_STORAGE_KEY = "hbn-portfolio-resume";

// ─── Reducer ───
function portfolioReducer(state, action) {
  switch (action.type) {
    case "UPDATE_PROFILE":
      return { ...state, profile: { ...state.profile, ...action.payload } };

    case "SET_FIELD":
      return { ...state, [action.field]: action.payload };

    case "ADD_ITEM": {
      const arr = state[action.field] || [];
      return { ...state, [action.field]: [...arr, action.payload] };
    }

    case "REMOVE_ITEM":
      return {
        ...state,
        [action.field]: (state[action.field] || []).filter(
          (item) => item.id !== action.id
        ),
      };

    case "UPDATE_ITEM":
      return {
        ...state,
        [action.field]: (state[action.field] || []).map((item) =>
          item.id === action.id ? { ...item, ...action.payload } : item
        ),
      };

    case "REORDER_ITEMS": {
      const items = [...(state[action.field] || [])];
      const [moved] = items.splice(action.fromIndex, 1);
      items.splice(action.toIndex, 0, moved);
      return { ...state, [action.field]: items.map((it, i) => ({ ...it, order: i })) };
    }

    case "UPDATE_THEME":
      return { ...state, theme: { ...state.theme, ...action.payload } };

    case "UPDATE_ANALYTICS":
      return { ...state, analytics: { ...state.analytics, ...action.payload } };

    case "TRACK_SECTION_VIEW": {
      const views = { ...state.analytics.sectionViews };
      views[action.section] = (views[action.section] || 0) + 1;
      return {
        ...state,
        analytics: { ...state.analytics, sectionViews: views },
      };
    }

    case "SET_FULL_DATA":
      return { ...action.payload };

    case "RESET":
      return { ...defaultData };

    default:
      return state;
  }
}

// ─── Initialize from LocalStorage ───
function getInitialState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      // Merge with defaults to pick up any new fields added in updates
      return { ...defaultData, ...parsed, profile: { ...defaultData.profile, ...parsed.profile } };
    }
  } catch (e) {
    console.warn("Failed to load portfolio data from LocalStorage:", e);
  }
  return { ...defaultData };
}

// ─── Load resume separately ───
function loadResume() {
  try {
    const saved = localStorage.getItem(RESUME_STORAGE_KEY);
    return saved || null;
  } catch (e) {
    console.warn("Failed to load resume from LocalStorage:", e);
    return null;
  }
}

// ─── Provider ───
export function PortfolioProvider({ children }) {
  const [state, dispatch] = useReducer(portfolioReducer, null, () => {
    const initialState = getInitialState();
    const resumeBase64 = loadResume();
    return { ...initialState, profile: { ...initialState.profile, resumeBase64 } };
  });

  // Persist to LocalStorage on every change (excluding resume to prevent quota overflow)
  useEffect(() => {
    try {
      const { resumeBase64, ...stateWithoutResume } = state;
      const { profile, ...rest } = stateWithoutResume;
      const { resumeBase64: _, ...profileWithoutResume } = profile;
      const dataToSave = { ...rest, profile: profileWithoutResume };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    } catch (e) {
      console.warn("Failed to save portfolio data:", e);
    }
  }, [state]);

  // Persist resume separately
  useEffect(() => {
    try {
      if (state.profile.resumeBase64) {
        localStorage.setItem(RESUME_STORAGE_KEY, state.profile.resumeBase64);
      } else {
        localStorage.removeItem(RESUME_STORAGE_KEY);
      }
    } catch (e) {
      console.warn("Failed to save resume:", e);
    }
  }, [state.profile.resumeBase64]);

  // Track visit on mount
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    const history = [...(state.analytics.visitHistory || [])];
    const todayEntry = history.find((h) => h.date === today);
    if (todayEntry) {
      todayEntry.count += 1;
    } else {
      history.push({ date: today, count: 1 });
    }
    // Keep last 90 days
    const trimmed = history.slice(-90);
    dispatch({
      type: "UPDATE_ANALYTICS",
      payload: {
        totalVisits: (state.analytics.totalVisits || 0) + 1,
        visitHistory: trimmed,
        lastVisit: new Date().toISOString(),
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Export data as JSON file download
  const exportData = useCallback(() => {
    const exportPayload = { ...state };
    delete exportPayload.analytics; // Don't export analytics
    const blob = new Blob([JSON.stringify(exportPayload, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `portfolio-backup-${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [state]);

  // Import data from JSON string
  const importData = useCallback(
    (jsonString) => {
      try {
        const data = JSON.parse(jsonString);
        dispatch({ type: "SET_FULL_DATA", payload: { ...defaultData, ...data } });
        return { success: true };
      } catch (e) {
        return { success: false, error: e.message };
      }
    },
    []
  );

  // Reset to defaults
  const resetData = useCallback(() => {
    dispatch({ type: "RESET" });
    // Also clear the resume from separate storage
    try {
      localStorage.removeItem(RESUME_STORAGE_KEY);
    } catch (e) {
      console.warn("Failed to clear resume:", e);
    }
  }, []);

  const value = {
    ...state,
    dispatch,
    exportData,
    importData,
    resetData,
  };

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
}

// ─── Hook ───
export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return context;
}

export default PortfolioContext;
