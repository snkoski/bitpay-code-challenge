import type { Product, Merchant } from "@prisma/client";

import { prisma } from "~/db.server";

export async function getProductsByMerchant(merchantId: Merchant["id"]) {
  return prisma.product.findMany({
    where: { merchantId },
    orderBy: { updatedAt: "desc" },
  });
}

export async function createProduct(
  merchantId: Merchant["id"],
  name: string,
  currentPriceUSD: number
) {
  return prisma.product.create({
    data: {
      merchantId,
      name,
      currentPriceUSD,
    },
  });
}
