const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function seed() {
  // cleanup the existing database
  await prisma.sale?.deleteMany({});
  await prisma.product?.deleteMany({});
  await prisma.merchant?.deleteMany({});

  const soapMerchant = await prisma.merchant.create({
    data: {
      name: "Shawn's Soap",
    },
  });

  const lavendarBar = await prisma.product.create({
    data: {
      name: "Lavendar Bar",
      currentPriceUSD: 500,
      merchantId: soapMerchant.id,
    },
  });

  const handSoap = await prisma.product.create({
    data: {
      name: "Hand Soap",
      currentPriceUSD: 1200,
      merchantId: soapMerchant.id,
    },
  });

  await prisma.sale.create({
    data: {
      crypto: "BTC",
      cryptoPriceAtSaleUSD: 928593,
      productPriceAtSaleUSD: lavendarBar.currentPriceUSD,
      productId: lavendarBar.id,
    },
  });

  await prisma.sale.create({
    data: {
      crypto: "ETH",
      cryptoPriceAtSaleUSD: 42208,
      productPriceAtSaleUSD: handSoap.currentPriceUSD,
      productId: handSoap.id,
    },
  });

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
