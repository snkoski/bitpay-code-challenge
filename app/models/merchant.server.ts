import type { Merchant } from "@prisma/client";

import { prisma } from "~/db.server";

export async function getMerchantById(id: Merchant["id"]) {
  return prisma.merchant.findUnique({ where: { id } });
}

export async function getMerchantByName(id: Merchant["id"]) {
  return prisma.merchant.findUnique({ where: { id } });
}

export async function getAllMerchants() {
  return prisma.merchant.findMany();
}

export async function createMerchant(name: string) {
  return prisma.merchant.create({
    data: {
      name,
    },
  });
}
