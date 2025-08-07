import React from "react";
import { useAuthContext } from "../../contexts/AuthContext";

interface AuthGuardProps {
  children: React.ReactNode;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { user, isLoading, error } = useAuthContext();

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-red-500">{error}</p>
        <p>Пожалуйста, убедитесь что вы открыли приложение через Telegram</p>
      </div>
    );
  }

  if (!user && !isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p>Доступ запрещен</p>
        <p>Пожалуйста, авторизуйтесь через Telegram</p>
      </div>
    );
  }

  return (
    <>
      {children}
      {isLoading && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </>
  );
};
