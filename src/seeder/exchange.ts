import logger from "../config/logger";
import prisma from "../config/prisma";

const seedExchange = async () => {
  const exchanges = await prisma.exchange.createMany({
    data: [
      {
        name: "XRP",
        symbol: "XRPUSDT",
        description:
          "The native cryptocurrency of the XRP Ledger, created in 2012 to enable fast, low-cost, cross-border payments. It’s widely used by financial institutions as a bridge asset.",
      },
      {
        name: "ADA",
        symbol: "ADAUSDT",
        description:
          "A proof-of-stake blockchain platform launched in 2017, designed for scalability, sustainability, and smart contracts. ADA is its native token, used for transactions, staking, and governance.",
      },
      {
        name: "SUI",
        symbol: "SUIUSDT",
        description:
          "A Layer-1 blockchain launched in 2023 by Mysten Labs, built with the Move programming language. SUI enables high-throughput, low-latency applications, with its token used for fees, staking, and governance.",
      },
    ],

  });

  return exchanges;
};

(async () => {
  try {
    const exchange = await seedExchange();
    logger.info("🌱 Done seeding exchange table", { exchange });
    process.exit(0);
  } catch (error) {
    logger.error("❌ Failed seeding exchange table", { error });
    process.exit(1);
  }
})();
