import useAuthStore from '@/store/authStore';

const useAuth = () => {
  const { user, setUser, logout } = useAuthStore();
  return { user, setUser, logout };
};

export default useAuth;