import { prisma } from "@/lib/prisma";

export async function getUserTransactions(userId: string) {
  return await prisma.transaction.findMany({
    where: { userId },
    orderBy: { date: "desc" },
  });
}
