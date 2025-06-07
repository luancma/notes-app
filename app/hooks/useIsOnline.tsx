import NetInfo from "@react-native-community/netinfo";
import { useEffect, useState } from "react";

export const useIsOnline = () => {
  const [isOnline, setIsOnline] = useState<boolean | null>(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsOnline(state.isConnected);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return isOnline;
};
