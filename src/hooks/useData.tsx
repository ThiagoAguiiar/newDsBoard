// Buscando dados do usuário do LocalStorage
export function useData() {
  const localToken = localStorage.getItem("token");
  const userData = localStorage.getItem("user-data");

  if (localToken && userData)
    return {
      localToken: JSON.parse(localToken),
      userData: JSON.parse(userData),
    };
}
