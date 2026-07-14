import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("socialsphereUser")) || null
  );

  const login = (userData, token) => {
    localStorage.setItem("socialsphereUser", JSON.stringify(userData));
    localStorage.setItem("socialsphereToken", token);

    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("socialsphereUser");
    localStorage.removeItem("socialsphereToken");

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);