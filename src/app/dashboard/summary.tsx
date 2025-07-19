"use client";

import { financeData } from "@/lib/finance-data";

export function SummaryByQuarter() {
  return (
    <div style={{ marginTop: "2rem" }}>
      {financeData.map((quarter) => (
        <div key={quarter.quarter} style={{ marginBottom: "2rem" }}>
          <h2 style={{ fontSize: "1.5rem", color: "#00d8ff" }}>
            {quarter.quarter}
          </h2>

          <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
            {quarter.months.map((month) => (
              <div
                key={month.month}
                style={{
                  backgroundColor: "#1e1e1e",
                  padding: "1rem",
                  borderRadius: "10px",
                  width: "300px",
                  boxShadow: "0 0 8px rgba(0,0,0,0.5)",
                }}
              >
                <h3 style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>
                  {month.month}
                </h3>

                {month.transactions.length === 0 ? (
                  <p style={{ color: "#888" }}>Sin transacciones</p>
                ) : (
                  <table style={{ width: "100%", fontSize: "0.9rem" }}>
                    <thead>
                      <tr>
                        <th style={{ textAlign: "left", color: "#ccc" }}>
                          Tipo
                        </th>
                        <th style={{ textAlign: "right", color: "#ccc" }}>
                          Monto
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {month.transactions.map((tx) => (
                        <tr key={tx.id}>
                          <td
                            style={{
                              color:
                                tx.type === "income" ? "#4caf50" : "#f44336",
                            }}
                          >
                            {tx.description}
                          </td>
                          <td style={{ textAlign: "right", color: "#eee" }}>
                            ${tx.amount}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
