"use client";

import { useAuth } from "./providers/AuthProvider";

export function TestAuthNav() {
  const { user, login, logout } = useAuth();

  return (
    <div className="p-4 space-y-4">
      <div>Auth Status: {user ? "Logged In" : "Logged Out"}</div>
      <div>User Email: {user?.email || "None"}</div>
      
      <div className="space-x-4">
        <button 
          onClick={() => login()}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Login with Google
        </button>
        
        <button 
          onClick={logout}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
} 