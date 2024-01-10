"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, getAuth, User } from "firebase/auth";
import firebase_app from "../firebase/config";
import { ProgressDemo, Progress } from "@/components/ui/progress";
const auth = getAuth(firebase_app);

interface AuthContextType {
  user: User | null;
}

export const AuthContext = createContext<AuthContextType>({ user: null });

export const useAuthContext = () => useContext(AuthContext);

interface AuthContextProviderProps {
  children: React.ReactNode;
}
export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [progress, setProgress] = useState(22); // Initial progress

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const startProgress = () => {
      timer = setInterval(() => {
        setProgress((prevProgress) =>
          prevProgress < 100 ? prevProgress + 1 : prevProgress
        );
      }, 10); // Adjust the interval to control the speed
    };

    const stopProgress = () => {
      clearInterval(timer);
      setProgress(100);
    };

    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        if (user) {
          setUser(user);
        } else {
          setUser(null);
        }
        setLoading(false);
        stopProgress();
      },
      (authError) => {
        // Handle authentication state change errors
        setError(authError);
        setLoading(false);
        stopProgress();
      }
    );

    // Start the progress when loading starts
    startProgress();

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <ProgressDemo loading={loading} progress={progress} />
        </div>
      ) : error ? (
        <div></div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};
