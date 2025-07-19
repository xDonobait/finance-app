import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import TransactionForm from "@/components/TransactionForm";


export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  // Obtener transacciones del usuario autenticado
  const transactions = await prisma.transaction.findMany({
    where: {
      user: {
        email: session.user?.email || "",
      },
    },
    orderBy: {
      date: "desc",
    },
  });

  return (
    <main style={{ padding: "2rem", color: "white" }}>
      <h1>Hola, {session.user?.name}</h1>
      <p>Tu email: {session.user?.email}</p>
      <p>Esta es tu zona privada (Dashboard).</p>

      <TransactionForm />

      <h2 style={{ marginTop: "2rem" }}>Tus Transacciones</h2>

      {transactions.length === 0 ? (
        <p>No tienes transacciones aún.</p>
      ) : (
        <table style={{ width: "100%", marginTop: "1rem", borderCollapse: "collapse" }}>
          <thead>
  <tr>
    <th>Fecha</th>
    <th>Tipo</th>
    <th>Descripción</th>
    <th>Monto</th>
    <th>Acciones</th> {/* Nueva columna */}
  </tr>
</thead>
<tbody>
  {transactions.map((tx) => (
    <tr key={tx.id}>
      <td>{new Date(tx.date).toLocaleDateString()}</td>
      <td>{tx.type === "INCOME" ? "Ingreso" : "Gasto"}</td>
      <td>{tx.description || "-"}</td>
      <td style={{ color: tx.type === "INCOME" ? "lightgreen" : "tomato" }}>
        {tx.amount.toLocaleString("es-CO", {
          style: "currency",
          currency: "COP",
        })}
      </td>
      <td>
        <form action={`/api/transactions/${tx.id}`} method="POST" style={{ display: "inline" }}>
          <input type="hidden" name="_method" value="DELETE" />
          <button type="submit" style={{ color: "red", background: "none", border: "none", cursor: "pointer" }}>
            Eliminar
          </button>
        </form>
      </td>
    </tr>
  ))}
</tbody>

        </table>
      )}
    </main>
  );
}
