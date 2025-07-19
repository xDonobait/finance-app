import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  const id = params.id;

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Verifica que la transacción sea del usuario autenticado
  const tx = await prisma.transaction.findUnique({
    where: { id },
  });

// Obtener el usuario por email
const dbUser = await prisma.user.findUnique({
  where: {
    email: session.user?.email || "",
  },
});

// Verificar si el usuario es el dueño de la transacción
if (!tx || tx.userId !== dbUser?.id) {
  return NextResponse.json({ error: "No autorizado o no encontrado" }, { status: 403 });
}


  await prisma.transaction.delete({
    where: { id },
  });

  return NextResponse.redirect("/dashboard"); // Redirige de nuevo al dashboard
}
