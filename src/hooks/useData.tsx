import { useEffect, useState } from "react";

// Buscando dados do usuário do LocalStorage
export function useData() {
  const [localToken, setLocalToken] = useState<string | null>(null);
  const [userData, setUserData] = useState<string | null>(null);

  useEffect(() => {
    setLocalToken(localStorage.getItem("token"));
    setUserData(localStorage.getItem("usar-data"));
  }, []);

  if (localToken && userData)
    return {
      localToken: JSON.parse(localToken),
      userData: JSON.parse(userData),
    };
  else return;
}
