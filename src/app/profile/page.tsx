import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <main style={{ padding: "2rem", color: "white" }}>
      <h1>Perfil de Usuario</h1>

      <div
        style={{
          backgroundColor: "#222",
          padding: "1.5rem",
          borderRadius: "10px",
          marginTop: "1rem",
          maxWidth: "400px",
        }}
      >
        <p><strong>Nombre:</strong> {session.user?.name}</p>
        <p><strong>Email:</strong> {session.user?.email}</p>

        {/* Aquí podrías agregar formularios para actualizar los datos */}
        <p style={{ marginTop: "1rem", color: "#bbb" }}>
          En el futuro aquí podrás editar tus datos.
        </p>
      </div>
    </main>
  );
}
