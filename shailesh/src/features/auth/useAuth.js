const useAuth = () => {
  const token = localStorage.getItem("token");

  const isAuthenticated = !!token;

  const logout = () => {
    localStorage.removeItem("token");
  };

  return { isAuthenticated, logout };
};

export default useAuth;