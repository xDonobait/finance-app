'use client';

import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <div style={{ display: 'grid', placeItems: 'center', height: '100vh', backgroundColor: '#111', color: 'white' }}>
      <div style={{ textAlign: 'center' }}>
        <h1>Bienvenido a Finance App</h1>
        <p>Inicia sesión para continuar</p>
        <button
          onClick={() => signIn('github')}
          style={{
            marginTop: '1rem',
            padding: '0.5rem 1rem',
            backgroundColor: '#333',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >
          Iniciar sesión con GitHub
        </button>
      </div>
    </div>
  );
}
