"use client";

import { useState } from "react";

export default function TransactionForm() {
  const [type, setType] = useState<"INCOME" | "EXPENSE">("INCOME");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const response = await fetch("/api/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type,
        amount: parseFloat(amount),
        description,
      }),
    });

    if (!response.ok) {
      setError("Hubo un error al registrar la transacción.");
    } else {
      setAmount("");
      setDescription("");
      window.location.reload(); // recarga la página para ver la nueva transacción
    }

    setIsLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "2rem" }}>
      <h3>Registrar nueva transacción</h3>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div style={{ marginBottom: "1rem" }}>
        <label>Tipo:</label><br />
        <select value={type} onChange={(e) => setType(e.target.value as any)}>
          <option value="INCOME">Ingreso</option>
          <option value="EXPENSE">Gasto</option>
        </select>
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label>Monto:</label><br />
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label>Descripción:</label><br />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Ej: Salario, Comida..."
        />
      </div>

      <button type="submit" disabled={isLoading}>
        {isLoading ? "Guardando..." : "Registrar"}
      </button>
    </form>
  );
}
