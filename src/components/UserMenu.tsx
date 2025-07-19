"use client";

import { signOut } from "next-auth/react";

export default function UserMenu() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/login" })}
      style={{
        padding: "0.5rem 1rem",
        backgroundColor: "#ff4d4d",
        border: "none",
        color: "white",
        borderRadius: "8px",
        cursor: "pointer"
      }}
    >
      Cerrar sesión
    </button>
  );
}
