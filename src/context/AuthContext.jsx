import { createContext, useContext, useState, useCallback } from "react";

const AuthContext = createContext(null);

const PW_KEY = "hbn-admin-password";
const DEFAULT_PASSWORD = "hassan2024";

export function AuthProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  // Get stored password or default
  const getPassword = useCallback(() => {
    return localStorage.getItem(PW_KEY) || DEFAULT_PASSWORD;
  }, []);

  // Login with password
  const login = useCallback(
    (password) => {
      const stored = getPassword();
      if (password === stored) {
        setIsAdmin(true);
        setIsEditMode(false);
        setIsPreviewMode(false);
        return true;
      }
      return false;
    },
    [getPassword]
  );

  // Logout
  const logout = useCallback(() => {
    setIsAdmin(false);
    setIsEditMode(false);
    setIsPreviewMode(false);
  }, []);

  // Change password
  const changePassword = useCallback(
    (oldPassword, newPassword) => {
      const stored = getPassword();
      if (oldPassword === stored && newPassword.length >= 4) {
        localStorage.setItem(PW_KEY, newPassword);
        return true;
      }
      return false;
    },
    [getPassword]
  );

  // Toggle edit mode
  const toggleEditMode = useCallback(() => {
    setIsEditMode((prev) => !prev);
    if (isPreviewMode) setIsPreviewMode(false);
  }, [isPreviewMode]);

  // Toggle preview mode (shows public view while in admin)
  const togglePreviewMode = useCallback(() => {
    setIsPreviewMode((prev) => !prev);
    if (isEditMode) setIsEditMode(false);
  }, [isEditMode]);

  // Effective admin state (false when previewing)
  const showAdminUI = isAdmin && !isPreviewMode;

  const value = {
    isAdmin,
    isEditMode,
    isPreviewMode,
    showAdminUI,
    login,
    logout,
    changePassword,
    toggleEditMode,
    togglePreviewMode,
  };

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export default AuthContext;
